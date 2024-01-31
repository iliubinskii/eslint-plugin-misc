"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = void 0;
const typescript_misc_1 = require("typescript-misc");
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
    const docs = {
        recommended: false,
        requiresTypeChecking: true,
        ...typescript_misc_1.o.removeUndefinedKeys.alt({
            ...rawDocs,
            defaultOptions,
            defaultSuboptions,
            description: typescript_misc_1.s.unpadMultiline(rawDocs.description),
            failExamples: typescript_misc_1.s.unpadMultiline(rawDocs.failExamples),
            passExamples: typescript_misc_1.s.unpadMultiline(rawDocs.passExamples),
            suboptionsKey
        })
    };
    const ruleCreator = utils_1.ESLintUtils.RuleCreator((name) => `https://iliubinskii.github.io/eslint-plugin-misc/${name}.html`);
    return ruleCreator({
        create: (rawContext, rawOptions) => {
            const context = (0, create_rule_internal_1.createContext)(rawContext, rawOptions, options);
            const typeCheck = (0, typescript_misc_1.classToInterface)(new TypeCheck_1.TypeCheck(rawContext));
            return create(context, typeCheck);
        },
        defaultOptions: [defaultOptions ?? {}],
        meta: {
            docs,
            messages,
            schema: [{}],
            type: "suggestion",
            ...typescript_misc_1.o.removeUndefinedKeys.alt({ fixable, hasSuggestions })
        },
        name: options.name
    });
}
exports.createRule = createRule;
//# sourceMappingURL=create-rule.js.map