import * as _ from "lodash-commonjs-es";
import type {
  AllowDisallowPatterns,
  Docs,
  FilePattern,
  Matcher,
  RegexpPattern,
  RuleListeners,
  Selector
} from "./types";
import { Casing, TypeGroup } from "./types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { Entry, unknowns } from "typescript-misc";
import {
  ProxyHandlerAction,
  a,
  as,
  cast,
  fn,
  is,
  o,
  reflect,
  s,
  wrapProxyHandler
} from "typescript-misc";
import type {
  RuleContext,
  RuleFunction,
  RuleListener,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { MinimatchOptions } from "minimatch";
import { minimatch } from "minimatch";

export const isCasing = is.factory(is.enumeration, Casing);

export const isFilePattern: is.Guard<FilePattern> = is.or.factory(
  is.string,
  is.strings
);

export const isRegexpPattern: is.Guard<RegexpPattern> = is.or.factory(
  is.string,
  is.strings
);

export const isSelector: is.Guard<Selector> = is.or.factory(
  is.string,
  is.strings
);

export const isTypeGroup = is.factory(is.enumeration, TypeGroup);

export const isTypeGroups = is.factory(is.array.of, isTypeGroup);

export const projectRoot = fn.pipe(
  process.cwd(),
  s.path.canonicalize,
  s.path.addTrailingSlash
);

/**
 * Creates file matcher.
 *
 * @param pattern - Pattern.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
export function createFileMatcher(
  pattern: AllowDisallowPatterns | FilePattern,
  defVal: boolean,
  options: Readonly<MinimatchOptions>
): Matcher {
  if (is.string(pattern)) return createFileMatcher([pattern], defVal, options);

  if (is.strings(pattern)) {
    const matchers = pattern.map(
      (p): Matcher =>
        str =>
          minimatch(str, p, options)
    );

    return matchers.length
      ? str => matchers.some(matcher => matcher(str))
      : () => defVal;
  }

  const { allow, disallow } = pattern;

  const allowMatcher = createFileMatcher(allow, false, options);

  const disallowMatcher = createFileMatcher(disallow, true, options);

  return allow.length || disallow.length
    ? str => disallowMatcher(str) && !allowMatcher(str)
    : () => defVal;
}

/**
 * Creates matcher.
 *
 * @param pattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
export function createRegexpMatcher(
  pattern: RegexpPattern,
  defVal: boolean
): Matcher {
  if (is.string(pattern)) return createRegexpMatcher([pattern], defVal);

  const matchers = pattern.map(
    (p): Matcher =>
      str =>
        // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
        new RegExp(p, "u").test(str)
  );

  return matchers.length
    ? str => matchers.some(matcher => matcher(str))
    : () => defVal;
}

/**
 * Merges listeners.
 *
 * @param listeners - Listeners.
 * @returns Merged listeners.
 */
export function mergeListeners(...listeners: RuleListeners): RuleListener {
  return o.fromEntries(
    o
      .entries(
        _.groupBy(
          listeners.flatMap(listener => o.entries(listener)),
          ([name]) => name
        )
      )
      .map(
        ([name, entries]): Entry<string, Visitors> => [
          name,
          entries.map(([, visitor]) => as.callable(visitor))
        ]
      )
      .map(
        ([name, visitors]): Entry<string, Visitor> => [
          name,
          node => {
            for (const visitor of visitors) visitor(node);
          }
        ]
      )
  );

  type Visitor = RuleFunction<TSESTree.Node>;

  type Visitors = readonly Visitor[];
}

/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param defVal - Default value.
 * @returns String representing node.
 */
export function nodeText(
  node: TSESTree.Node,
  defVal: fn.ValueGenerator<string> | string
): string {
  switch (node.type) {
    case AST_NODE_TYPES.Identifier:
      return node.name;

    case AST_NODE_TYPES.Literal:
      return cast.string(node.value);

    default:
      return as.callable<fn.ValueGenerator<string>>(defVal)();
  }
}

/**
 * Assembles selector.
 *
 * @param raw - Raw selector.
 * @returns Selector.
 */
export function selector(raw: Selector): string {
  const result = a.fromMixed(raw).join(", ");

  return result === "" ? "Unknown" : result;
}

/**
 * Sets casing.
 *
 * @param str - String.
 * @param casing - Casing.
 * @returns Formatted string.
 */
export function setCasing(str: string, casing?: Casing): string {
  switch (casing) {
    case Casing.camelCase:
      return _.camelCase(str);

    case Casing.kebabCase:
      return _.kebabCase(str);

    case Casing.pascalCase:
      return s.ucFirst(_.camelCase(str));

    case undefined:
      return str;
  }
}

/**
 * Wraps third-party rule.
 *
 * @param options - Options.
 * @returns Wrapped rule.
 */
export function wrapRule<M extends string, O extends unknowns>(
  options: WrapRuleOptions<M, O>
): RuleModule<M, O> {
  const { docs: rawDocs, options: ruleOptions, rule } = options;

  const docs: ESLintUtils.NamedCreateRuleMetaDocs<O> = {
    recommended: "recommended",
    requiresTypeChecking: true,
    ...o.removeUndefinedKeys.alt({
      ...rawDocs,
      description: s.unpadMultiline(rawDocs.description),
      failExamples: s.unpadMultiline(rawDocs.failExamples),
      passExamples: s.unpadMultiline(rawDocs.passExamples)
    })
  };

  return {
    ...rule,
    create: context => {
      const optionsOverridesArray = ruleOptions.map((opts, index) => {
        const overrides = context.options[index];

        return is.object(opts) && is.object(overrides)
          ? { ...opts, ...overrides }
          : opts;
      });

      return rule.create(
        new Proxy(
          {} as RuleContext<M, O>,
          wrapProxyHandler("wrap-rule", ProxyHandlerAction.throw, {
            get: (_target, key) =>
              key === "options"
                ? optionsOverridesArray
                : reflect.get(context, key)
          })
        )
      );
    },
    meta: { ...rule.meta, docs }
  };
}

export interface WrapRuleOptions<M extends string, O extends unknowns> {
  readonly docs: Docs;
  readonly options: O;
  readonly rule: RuleModule<M, O>;
}
