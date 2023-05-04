import * as _ from "lodash-commonjs-es";
import { Casing, TypeGroup } from "./types";
import { ProxyHandlerAction, a, as, cast, fn, is, o, reflect, s, wrapProxyHandler } from "real-fns";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { Accumulator } from "real-classes";
import { minimatch } from "minimatch";
export const isCasing = is.factory(is.enumeration, Casing);
export const isFilePattern = is.or.factory(is.string, is.strings);
export const isRegexpPattern = is.or.factory(is.string, is.strings);
export const isSelector = is.or.factory(is.string, is.strings);
export const isTypeGroup = is.factory(is.enumeration, TypeGroup);
export const isTypeGroups = is.factory(is.array.of, isTypeGroup);
export const projectRoot = fn.pipe(process.cwd(), s.path.canonicalize, s.path.addTrailingSlash);
/**
 * Creates file matcher.
 *
 * @param pattern - Pattern.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
export function createFileMatcher(pattern, defVal, options) {
    if (is.string(pattern))
        return createFileMatcher([pattern], defVal, options);
    if (is.strings(pattern)) {
        const matchers = pattern.map((p) => str => minimatch(str, p, options));
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
export function createRegexpMatcher(pattern, defVal) {
    if (is.string(pattern))
        return createRegexpMatcher([pattern], defVal);
    const matchers = pattern.map((p) => str => 
    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
    new RegExp(p, "u").test(str));
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
export function mergeListeners(...listeners) {
    const accumulator = new Accumulator();
    for (const listener of listeners)
        for (const [name, visitor] of o.entries(listener))
            accumulator.push(name, as.callable(visitor));
    // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment -- Ok
    return o.fromEntries(a.fromIterable(accumulator).map(([name, visitors]) => [
        name,
        node => {
            for (const visitor of visitors)
                visitor(node);
        }
    ]));
}
/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param defVal - Default value.
 * @returns String representing node.
 */
export function nodeText(node, defVal) {
    switch (node.type) {
        case AST_NODE_TYPES.Identifier:
            return node.name;
        case AST_NODE_TYPES.Literal:
            return cast.string(node.value);
        default:
            return as.callable(defVal)();
    }
}
/**
 * Assemles selector.
 *
 * @param raw - Raw selector.
 * @returns Selector.
 */
export function selector(raw) {
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
export function setCasing(str, casing) {
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
export function wrapRule(options) {
    const { docs: rawDocs, options: ruleOptions, rule } = options;
    const docs = Object.assign({ recommended: false, requiresTypeChecking: true }, o.removeUndefinedKeys.alt(Object.assign(Object.assign({}, rawDocs), { description: rawDocs
            ? s.unpadMultiline(rawDocs.description)
            : "No description.", failExamples: rawDocs
            ? s.unpadMultiline(rawDocs.failExamples)
            : undefined, passExamples: rawDocs ? s.unpadMultiline(rawDocs.passExamples) : undefined })));
    return Object.assign(Object.assign({}, rule), { create: context => {
            const optionsOverridesArray = ruleOptions.map((opts, index) => {
                const overrides = context.options[index];
                return is.object(opts) && is.object(overrides)
                    ? Object.assign(Object.assign({}, opts), overrides) : opts;
            });
            return rule.create(new Proxy({}, wrapProxyHandler("wrap-rule", ProxyHandlerAction.throw, {
                get: (_target, key) => key === "options"
                    ? optionsOverridesArray
                    : reflect.get(context, key)
            })));
        }, meta: Object.assign(Object.assign({}, rule.meta), { docs }) });
}
//# sourceMappingURL=misc.js.map