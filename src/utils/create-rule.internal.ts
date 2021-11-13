import * as _ from "@skylib/lodash-commonjs-es";
import type * as estree from "estree";
import type {
  Casing,
  Context,
  Docs,
  Options,
  SharedSuboptions,
  Suboptions,
  SuboptionsArray,
  esRange,
  esRanges
} from "./types";
import type { ClassToInterface, Rec, unknowns } from "@skylib/functions";
import type {
  RuleContext,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import { a, assert, evaluate, is, json, o, s } from "@skylib/functions";
import { createFileMatcher, projectRoot, setCasing } from "./misc";
import type { TSESTree } from "@typescript-eslint/utils";
import type { TypeCheck } from "./TypeCheck";
import fs from "node:fs";
import nodePath from "node:path";

export const isProjectConfig: is.Guard<ProjectConfig> = is.factory(
  is.object.of,
  {},
  { name: is.string }
);

export type ContextOptionsArray = readonly [object];

export interface CreateRuleOptions<
  M extends string,
  O extends object,
  S extends object,
  K extends string = never
> {
  /**
   * Creates rule listener.
   *
   * @param context - Context.
   * @param typeCheck - Type check.
   * @returns Rule listener.
   */
  readonly create: (
    context: Context<M, O, S, K>,
    typeCheck: ClassToInterface<TypeCheck>
  ) => RuleListener;
  readonly defaultOptions?: Readonly<Partial<O>>;
  readonly defaultSuboptions?: Readonly<Partial<S>>;
  readonly docs: Docs<keyof O, keyof S>;
  readonly fixable?: "code" | "whitespace";
  readonly isOptions?: is.Guard<O>;
  readonly isSuboptions?: is.Guard<S>;
  readonly messages: Rec<M, string>;
  readonly name: string;
  readonly suboptionsKey?: K;
  readonly vue: boolean;
}

export type PartialOptions<
  O extends object,
  S extends object,
  K extends string = never
> = Partial<O> & { readonly [L in K]?: SuboptionsArray<Partial<S>> };

export type PartialOptionsArray<
  O extends object,
  S extends object,
  K extends string = never
> = readonly [PartialOptions<O, S, K>];

export interface ProjectConfig {
  readonly name?: string;
}

/**
 * Creates context.
 *
 * @param context - Raw context.
 * @param ruleOptionsArray - Rule options.
 * @param options - Options.
 * @returns Context.
 */
export function createContext<
  M extends string,
  O extends object,
  S extends object,
  K extends string = never
>(
  context: RuleContext<M, unknowns>,
  ruleOptionsArray: unknowns,
  options: CreateRuleOptions<M, O, S, K>
): Context<M, O, S, K> {
  const filename = context.getFilename();

  const projectConfig = getProjectConfig();

  const source = context.getSourceCode();

  const code = source.getText();

  return {
    eol: s.detectEol(code),
    filename,
    getCommentRanges,
    getComments: node =>
      getCommentRanges(node).map(range => code.slice(...range)),
    getFullRange,
    getFullText: node => code.slice(...getFullRange(node)),
    getLeadingSpaces: node => {
      const end = getFullRange(node)[0];

      const pos = code.slice(0, end).trimEnd().length;

      return [pos, end];
    },
    getLoc: (range): estree.SourceLocation => ({
      end: source.getLocFromIndex(range[1]),
      start: source.getLocFromIndex(range[0])
    }),
    getText,
    hasTrailingComment: node =>
      code.slice(node.range[1]).trimStart().startsWith("//"),
    identifierFromPath,
    isAdjacentNodes: (node1, node2) => {
      if (node1.parent === node2.parent) {
        const pos = node1.range[1];

        const end = getFullRange(node2)[0];

        if (pos <= end) return ["", ","].includes(code.slice(pos, end).trim());
      }

      return false;
    },
    locZero: {
      end: source.getLocFromIndex(0),
      start: source.getLocFromIndex(0)
    },
    normalizeSource: src =>
      s.path.canonicalize(
        evaluate(() => {
          if (src === "@") {
            assert.not.empty(projectConfig.name, "Missing package name");

            return `${projectConfig.name}/src`;
          }

          if (src.startsWith("@/")) {
            assert.not.empty(projectConfig.name, "Missing package name");

            return `${projectConfig.name}/src/${src.slice(2)}`;
          }

          if (
            src === "." ||
            src === ".." ||
            src.startsWith("./") ||
            src.startsWith("../")
          ) {
            assert.not.empty(projectConfig.name, "Missing package name");

            const path = nodePath.join(nodePath.dirname(filename), src);

            return `${projectConfig.name}/${stripBase(path)}`;
          }

          return src;
        })
      ),
    options: evaluate((): Options<O, S, K> => {
      const { defaultSuboptions, isOptions, isSuboptions, suboptionsKey } = {
        isOptions: is.unknown as is.Guard<O>,
        ...options
      } as const;

      const rawRuleOptions = ruleOptionsArray[0];

      assert.byGuard(rawRuleOptions, isOptions, "Expecting valid rule options");

      const result =
        defaultSuboptions || isSuboptions || is.not.empty(suboptionsKey)
          ? evaluate((): Options<O, S, K> => {
              assert.not.empty(isSuboptions, "Expecting suboptions guard");
              assert.not.empty(suboptionsKey, "Expecting suboptions key");

              const suboptionsArray =
                o.get(rawRuleOptions, suboptionsKey) ?? [];

              assert.array.of(
                suboptionsArray,
                is.object,
                "Expecting valid rule options"
              );

              const suboptionsArrayWithDefaults: unknown = suboptionsArray.map(
                (suboptions): object => ({
                  ...defaultSuboptions,
                  ...suboptions
                })
              );

              const isSuboptionsWithShared: is.Guard<Suboptions<S>> =
                is.and.factory(isSharedSuboptions, isSuboptions);

              assert.array.of(
                suboptionsArrayWithDefaults,
                isSuboptionsWithShared,
                "Expecting valid rule options"
              );

              const ruleOptionsWithSuboptions = {
                ...rawRuleOptions,
                [suboptionsKey]: suboptionsArrayWithDefaults.filter(
                  suboptions => shouldBeLinted(filename, suboptions)
                )
              } as const;

              return ruleOptionsWithSuboptions as Options<O, S, K>;
            })
          : rawRuleOptions;

      return result as Options<O, S, K>;
    }),
    rawContext: context,
    report: context.report.bind(context),
    scope: context.getScope(),
    stripExtension,
    textFromPath
  };

  function getCommentRanges(node: TSESTree.Node): esRanges {
    return source.getCommentsBefore(node).map(comment => comment.range);
  }

  function getFullRange(node: TSESTree.Node): esRange {
    return [
      Math.min(node.range[0], ...getCommentRanges(node).map(range => range[0])),
      node.range[1]
    ];
  }

  function getText(
    mixed: esRange | TSESTree.Comment | TSESTree.Node | number
  ): string {
    if (is.number(mixed)) return code.slice(mixed);

    if (is.array(mixed)) return code.slice(...mixed);

    return code.slice(...mixed.range);
  }

  function identifierFromPath(path: string, expected?: string): string {
    const { base, dir } = nodePath.parse(path);

    const name = stripExtension(base);

    if (name === "index") return identifierFromPath(dir, expected);

    const candidates = name
      .split(".")
      .filter((part, index) => !(index === 0 && part === "index"))
      .map(part =>
        /^[A-Z]/u.test(part) ? s.ucFirst(_.camelCase(part)) : _.camelCase(part)
      );

    return is.not.empty(expected) && candidates.includes(expected)
      ? expected
      : a.first(candidates);
  }

  function stripExtension(str: string): string {
    for (const ext of [".js", ".ts", ".vue"])
      if (str.endsWith(ext)) return str.slice(0, -ext.length);

    return str;
  }

  function textFromPath(
    path: string,
    expected: string,
    format: Casing | undefined
  ): string {
    const { base, dir } = nodePath.parse(path);

    const name = stripExtension(base);

    if (name === "index") return textFromPath(dir, expected, format);

    const candidates = name
      .split(".")
      .filter((part, index) => !(index === 0 && part === "index"))
      .map(part => setCasing(part, format));

    return candidates.includes(expected) ? expected : a.first(candidates);
  }
}

/**
 * Parses package.json file.
 *
 * @param path - Path.
 * @returns Project configuration.
 */
export function getProjectConfig(path = "package.json"): ProjectConfig {
  if (fs.existsSync(path)) {
    const result = json.decode(fs.readFileSync(path).toString());

    if (isProjectConfig(result)) return result;
  }

  return {};
}

const isSharedSuboptions = is.object.factory<SharedSuboptions>(
  {},
  { filesToLint: is.strings, filesToSkip: is.strings }
);

/**
 * Determines if file should be linted.
 *
 * @param path - Path.
 * @param options - Options.
 * @returns _True_ if file should be linted, _false_ otherwise.
 */
function shouldBeLinted(path: string, options: SharedSuboptions): boolean {
  const matcher = createFileMatcher(
    { allow: options.filesToLint ?? [], disallow: options.filesToSkip ?? [] },
    false,
    { dot: true, matchBase: true }
  );

  const disallow = matcher(stripBase(s.path.canonicalize(path), "./"));

  return !disallow;
}

/**
 * Strips base path.
 *
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
function stripBase(path: string, replacement = ""): string {
  assert.toBeTrue(
    s.path.canonicalize(path).startsWith(projectRoot),
    `Expecting path to be inside project folder: ${path}`
  );

  return `${replacement}${path.slice(projectRoot.length)}`;
}
