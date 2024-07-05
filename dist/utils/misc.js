"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoot = exports.isTypeGroups = exports.isTypeGroup = exports.isSelector = exports.isRegexpPattern = exports.isFilePattern = exports.isCasing = void 0;
exports.createFileMatcher = createFileMatcher;
exports.createRegexpMatcher = createRegexpMatcher;
exports.mergeListeners = mergeListeners;
exports.nodeText = nodeText;
exports.selector = selector;
exports.setCasing = setCasing;
exports.wrapRule = wrapRule;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash-commonjs-es"));
const types_1 = require("./types");
const typescript_misc_1 = require("typescript-misc");
const utils_1 = require("@typescript-eslint/utils");
const minimatch_1 = require("minimatch");
exports.isCasing = typescript_misc_1.is.factory(typescript_misc_1.is.enumeration, types_1.Casing);
exports.isFilePattern = typescript_misc_1.is.or.factory(typescript_misc_1.is.string, typescript_misc_1.is.strings);
exports.isRegexpPattern = typescript_misc_1.is.or.factory(typescript_misc_1.is.string, typescript_misc_1.is.strings);
exports.isSelector = typescript_misc_1.is.or.factory(typescript_misc_1.is.string, typescript_misc_1.is.strings);
exports.isTypeGroup = typescript_misc_1.is.factory(typescript_misc_1.is.enumeration, types_1.TypeGroup);
exports.isTypeGroups = typescript_misc_1.is.factory(typescript_misc_1.is.array.of, exports.isTypeGroup);
exports.projectRoot = typescript_misc_1.fn.pipe(process.cwd(), typescript_misc_1.s.path.canonicalize, typescript_misc_1.s.path.addTrailingSlash);
/**
 * Creates file matcher.
 * @param pattern - Pattern.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
function createFileMatcher(pattern, defVal, options) {
    if (typescript_misc_1.is.string(pattern))
        return createFileMatcher([pattern], defVal, options);
    if (typescript_misc_1.is.strings(pattern)) {
        const matchers = pattern.map((p) => str => (0, minimatch_1.minimatch)(str, p, options));
        return matchers.length > 0
            ? str => matchers.some(matcher => matcher(str))
            : () => defVal;
    }
    const { allow, disallow } = pattern;
    const allowMatcher = createFileMatcher(allow, false, options);
    const disallowMatcher = createFileMatcher(disallow, true, options);
    return allow.length > 0 || disallow.length > 0
        ? str => disallowMatcher(str) && !allowMatcher(str)
        : () => defVal;
}
/**
 * Creates matcher.
 * @param pattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
function createRegexpMatcher(pattern, defVal) {
    if (typescript_misc_1.is.string(pattern))
        return createRegexpMatcher([pattern], defVal);
    const matchers = pattern.map((p) => str => 
    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
    new RegExp(p, "u").test(str));
    return matchers.length > 0
        ? str => matchers.some(matcher => matcher(str))
        : () => defVal;
}
/**
 * Merges listeners.
 * @param listeners - Listeners.
 * @returns Merged listeners.
 */
function mergeListeners(...listeners) {
    return typescript_misc_1.o.fromEntries(typescript_misc_1.o
        .entries(_.groupBy(listeners.flatMap(listener => typescript_misc_1.o.entries(listener)), ([name]) => name))
        .map(([name, entries]) => [
        name,
        entries.map(([, visitor]) => typescript_misc_1.as.callable(visitor))
    ])
        .map(([name, visitors]) => [
        name,
        node => {
            for (const visitor of visitors)
                visitor(node);
        }
    ]));
}
/**
 * Returns string representing node.
 * @param node - Node.
 * @param defVal - Default value.
 * @returns String representing node.
 */
function nodeText(node, defVal) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.Identifier: {
            return node.name;
        }
        case utils_1.AST_NODE_TYPES.Literal: {
            return typescript_misc_1.cast.string(node.value);
        }
        default: {
            return typescript_misc_1.as.callable(defVal)();
        }
    }
}
/**
 * Assembles selector.
 * @param raw - Raw selector.
 * @returns Selector.
 */
function selector(raw) {
    const result = typescript_misc_1.a.fromMixed(raw).join(", ");
    return result === "" ? "Unknown" : result;
}
/**
 * Sets casing.
 * @param str - String.
 * @param casing - Casing.
 * @returns Formatted string.
 */
function setCasing(str, casing) {
    switch (casing) {
        case types_1.Casing.camelCase: {
            return _.camelCase(str);
        }
        case types_1.Casing.kebabCase: {
            return _.kebabCase(str);
        }
        case types_1.Casing.pascalCase: {
            return typescript_misc_1.s.ucFirst(_.camelCase(str));
        }
        case undefined: {
            return str;
        }
    }
}
/**
 * Wraps third-party rule.
 * @param options - Options.
 * @returns Wrapped rule.
 */
function wrapRule(options) {
    const { docs: rawDocs, options: ruleOptions, rule } = options;
    const docs = {
        recommended: "recommended",
        requiresTypeChecking: true,
        ...typescript_misc_1.o.removeUndefinedKeys.alt({
            ...rawDocs,
            description: typescript_misc_1.s.unpadMultiline(rawDocs.description),
            failExamples: typescript_misc_1.s.unpadMultiline(rawDocs.failExamples),
            passExamples: typescript_misc_1.s.unpadMultiline(rawDocs.passExamples)
        })
    };
    return {
        ...rule,
        create: context => {
            const optionsOverridesArray = ruleOptions.map((opts, index) => {
                const overrides = context.options[index];
                return typescript_misc_1.is.object(opts) && typescript_misc_1.is.object(overrides)
                    ? { ...opts, ...overrides }
                    : opts;
            });
            return rule.create(new Proxy({}, (0, typescript_misc_1.wrapProxyHandler)("wrap-rule", typescript_misc_1.ProxyHandlerAction.throw, {
                get: (_target, key) => key === "options"
                    ? optionsOverridesArray
                    : typescript_misc_1.reflect.get(context, key)
            })));
        },
        meta: { ...rule.meta, docs }
    };
}
//# sourceMappingURL=misc.js.map