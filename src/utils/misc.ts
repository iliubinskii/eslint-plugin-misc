import * as _ from "@skylib/lodash-commonjs-es";
import {
  Accumulator,
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
} from "@skylib/functions";
import type {
  AllowDisallowPatterns,
  FilePattern,
  Matcher,
  RegexpPattern,
  RuleListeners,
  Selector
} from "./types";
import { Casing, TypeGroup } from "./types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import type { Entry, unknowns } from "@skylib/functions";
import type {
  RuleContext,
  RuleFunction,
  RuleListener,
  RuleModule
} from "@typescript-eslint/utils/dist/ts-eslint";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import type { WrapRuleOptions } from "./misc.internal";
import minimatch from "minimatch";

export const isCasing = is.factory(is.enumeration, Casing);

export const isStringOrStrings = is.or.factory(is.string, is.strings);

export const isFilePattern: is.Guard<FilePattern> = is.or.factory(
  isStringOrStrings,
  is.object.factory<AllowDisallowPatterns>(
    { allow: isStringOrStrings, disallow: isStringOrStrings },
    {}
  )
);

export const isRegexpPattern: is.Guard<RegexpPattern> = isStringOrStrings;

export const isSelector: is.Guard<Selector> = isStringOrStrings;

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
  pattern: FilePattern,
  defVal: boolean,
  options: Readonly<minimatch.IOptions>
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
  const accumulator = new Accumulator<string, Visitor>();

  for (const listener of listeners)
    for (const [name, visitor] of o.entries(listener))
      accumulator.push(name, as.callable<Visitor>(visitor));

  // eslint-disable-next-line @skylib/typescript/no-unsafe-object-assignment -- Ok
  return o.fromEntries(
    a.fromIterable(accumulator).map(
      ([name, visitors]): Entry<string, Visitor> => [
        name,
        node => {
          for (const visitor of visitors) visitor(node);
        }
      ]
    )
  );

  type Visitor = RuleFunction<TSESTree.Node>;
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
 * Assemles selector.
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

  const docs: ESLintUtils.NamedCreateRuleMetaDocs = {
    recommended: false,
    requiresTypeChecking: true,
    ...o.removeUndefinedKeys({
      ...rawDocs,
      description: rawDocs
        ? s.unpadMultiline(rawDocs.description)
        : "No description.",
      failExamples: rawDocs
        ? s.unpadMultiline(rawDocs.failExamples)
        : undefined,
      passExamples: rawDocs ? s.unpadMultiline(rawDocs.passExamples) : undefined
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
