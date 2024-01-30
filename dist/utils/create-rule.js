"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = void 0;
const real_fns_1 = require("real-fns");
const utils_1 = require("@typescript-eslint/utils");
const TypeCheck_1 = require("./TypeCheck");
const create_rule_internal_1 = require("./create-rule.internal");
/**
 * Creates rule listener.
 *
 * @param options - Options.
 * @returns Rule listener.
 */
function createRule(options) {
    const { create, defaultOptions, defaultSuboptions, docs: rawDocs, fixable, hasSuggestions, messages, suboptionsKey } = options;
    const docs = Object.assign({ recommended: false, requiresTypeChecking: true }, real_fns_1.o.removeUndefinedKeys.alt(Object.assign(Object.assign({}, rawDocs), { defaultOptions,
        defaultSuboptions, description: real_fns_1.s.unpadMultiline(rawDocs.description), failExamples: real_fns_1.s.unpadMultiline(rawDocs.failExamples), passExamples: real_fns_1.s.unpadMultiline(rawDocs.passExamples), suboptionsKey })));
    const ruleCreator = utils_1.ESLintUtils.RuleCreator((name) => `https://iliubinskii.github.io/eslint-plugin-misc/${name}.html`);
    return ruleCreator({
        create: (rawContext, rawOptions) => {
            const context = (0, create_rule_internal_1.createContext)(rawContext, rawOptions, options);
            const typeCheck = (0, real_fns_1.classToInterface)(new TypeCheck_1.TypeCheck(rawContext));
            return create(context, typeCheck);
        },
        defaultOptions: [defaultOptions !== null && defaultOptions !== void 0 ? defaultOptions : {}],
        meta: Object.assign({ docs,
            messages, schema: [{}], type: "suggestion" }, real_fns_1.o.removeUndefinedKeys.alt({ fixable, hasSuggestions })),
        name: options.name
    });
}
exports.createRule = createRule;
//# sourceMappingURL=create-rule.js.map