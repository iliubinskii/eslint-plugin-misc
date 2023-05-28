"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRule = exports.setCasing = exports.selector = exports.nodeText = exports.mergeListeners = exports.createRegexpMatcher = exports.createFileMatcher = exports.projectRoot = exports.isTypeGroups = exports.isTypeGroup = exports.isSelector = exports.isRegexpPattern = exports.isFilePattern = exports.isCasing = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash-commonjs-es"));
const types_1 = require("./types");
const real_fns_1 = require("real-fns");
const utils_1 = require("@typescript-eslint/utils");
const real_classes_1 = require("real-classes");
const minimatch_1 = require("minimatch");
exports.isCasing = real_fns_1.is.factory(real_fns_1.is.enumeration, types_1.Casing);
exports.isFilePattern = real_fns_1.is.or.factory(real_fns_1.is.string, real_fns_1.is.strings);
exports.isRegexpPattern = real_fns_1.is.or.factory(real_fns_1.is.string, real_fns_1.is.strings);
exports.isSelector = real_fns_1.is.or.factory(real_fns_1.is.string, real_fns_1.is.strings);
exports.isTypeGroup = real_fns_1.is.factory(real_fns_1.is.enumeration, types_1.TypeGroup);
exports.isTypeGroups = real_fns_1.is.factory(real_fns_1.is.array.of, exports.isTypeGroup);
exports.projectRoot = real_fns_1.fn.pipe(process.cwd(), real_fns_1.s.path.canonicalize, real_fns_1.s.path.addTrailingSlash);
/**
 * Creates file matcher.
 *
 * @param pattern - Pattern.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
function createFileMatcher(pattern, defVal, options) {
    if (real_fns_1.is.string(pattern))
        return createFileMatcher([pattern], defVal, options);
    if (real_fns_1.is.strings(pattern)) {
        const matchers = pattern.map((p) => str => (0, minimatch_1.minimatch)(str, p, options));
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
exports.createFileMatcher = createFileMatcher;
/**
 * Creates matcher.
 *
 * @param pattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
function createRegexpMatcher(pattern, defVal) {
    if (real_fns_1.is.string(pattern))
        return createRegexpMatcher([pattern], defVal);
    const matchers = pattern.map((p) => str => 
    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
    new RegExp(p, "u").test(str));
    return matchers.length
        ? str => matchers.some(matcher => matcher(str))
        : () => defVal;
}
exports.createRegexpMatcher = createRegexpMatcher;
/**
 * Merges listeners.
 *
 * @param listeners - Listeners.
 * @returns Merged listeners.
 */
function mergeListeners(...listeners) {
    const accumulator = new real_classes_1.Accumulator();
    for (const listener of listeners)
        for (const [name, visitor] of real_fns_1.o.entries(listener))
            accumulator.push(name, real_fns_1.as.callable(visitor));
    // eslint-disable-next-line misc/typescript/no-unsafe-object-assignment -- Ok
    return real_fns_1.o.fromEntries(real_fns_1.a.fromIterable(accumulator).map(([name, visitors]) => [
        name,
        node => {
            for (const visitor of visitors)
                visitor(node);
        }
    ]));
}
exports.mergeListeners = mergeListeners;
/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param defVal - Default value.
 * @returns String representing node.
 */
function nodeText(node, defVal) {
    switch (node.type) {
        case utils_1.AST_NODE_TYPES.Identifier:
            return node.name;
        case utils_1.AST_NODE_TYPES.Literal:
            return real_fns_1.cast.string(node.value);
        default:
            return real_fns_1.as.callable(defVal)();
    }
}
exports.nodeText = nodeText;
/**
 * Assembles selector.
 *
 * @param raw - Raw selector.
 * @returns Selector.
 */
function selector(raw) {
    const result = real_fns_1.a.fromMixed(raw).join(", ");
    return result === "" ? "Unknown" : result;
}
exports.selector = selector;
/**
 * Sets casing.
 *
 * @param str - String.
 * @param casing - Casing.
 * @returns Formatted string.
 */
function setCasing(str, casing) {
    switch (casing) {
        case types_1.Casing.camelCase:
            return _.camelCase(str);
        case types_1.Casing.kebabCase:
            return _.kebabCase(str);
        case types_1.Casing.pascalCase:
            return real_fns_1.s.ucFirst(_.camelCase(str));
        case undefined:
            return str;
    }
}
exports.setCasing = setCasing;
/**
 * Wraps third-party rule.
 *
 * @param options - Options.
 * @returns Wrapped rule.
 */
function wrapRule(options) {
    const { docs: rawDocs, options: ruleOptions, rule } = options;
    const docs = Object.assign({ recommended: false, requiresTypeChecking: true }, real_fns_1.o.removeUndefinedKeys.alt(Object.assign(Object.assign({}, rawDocs), { description: rawDocs
            ? real_fns_1.s.unpadMultiline(rawDocs.description)
            : "No description.", failExamples: rawDocs
            ? real_fns_1.s.unpadMultiline(rawDocs.failExamples)
            : undefined, passExamples: rawDocs ? real_fns_1.s.unpadMultiline(rawDocs.passExamples) : undefined })));
    return Object.assign(Object.assign({}, rule), { create: context => {
            const optionsOverridesArray = ruleOptions.map((opts, index) => {
                const overrides = context.options[index];
                return real_fns_1.is.object(opts) && real_fns_1.is.object(overrides)
                    ? Object.assign(Object.assign({}, opts), overrides) : opts;
            });
            return rule.create(new Proxy({}, (0, real_fns_1.wrapProxyHandler)("wrap-rule", real_fns_1.ProxyHandlerAction.throw, {
                get: (_target, key) => key === "options"
                    ? optionsOverridesArray
                    : real_fns_1.reflect.get(context, key)
            })));
        }, meta: Object.assign(Object.assign({}, rule.meta), { docs }) });
}
exports.wrapRule = wrapRule;
//# sourceMappingURL=misc.js.map