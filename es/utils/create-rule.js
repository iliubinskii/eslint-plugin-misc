import { classToInterface, o, s } from "typescript-misc";
import { ESLintUtils } from "@typescript-eslint/utils";
import { TypeCheck } from "./TypeCheck";
import { createContext } from "./create-rule.internal";
/**
 * Creates rule listener.
 *
 * @param options - Options.
 * @returns Rule listener.
 */
export function createRule(options) {
    const { create, defaultOptions, defaultSuboptions, docs: rawDocs, fixable, hasSuggestions, messages, suboptionsKey } = options;
    const docs = {
        recommended: false,
        requiresTypeChecking: true,
        ...o.removeUndefinedKeys.alt({
            ...rawDocs,
            defaultOptions,
            defaultSuboptions,
            description: s.unpadMultiline(rawDocs.description),
            failExamples: s.unpadMultiline(rawDocs.failExamples),
            passExamples: s.unpadMultiline(rawDocs.passExamples),
            suboptionsKey
        })
    };
    const ruleCreator = ESLintUtils.RuleCreator((name) => `https://iliubinskii.github.io/eslint-plugin-misc/${name}.html`);
    return ruleCreator({
        create: (rawContext, rawOptions) => {
            const context = createContext(rawContext, rawOptions, options);
            const typeCheck = classToInterface(new TypeCheck(rawContext));
            return create(context, typeCheck);
        },
        defaultOptions: [defaultOptions ?? {}],
        meta: {
            docs,
            messages,
            schema: [{}],
            type: "suggestion",
            ...o.removeUndefinedKeys.alt({ fixable, hasSuggestions })
        },
        name: options.name
    });
}
//# sourceMappingURL=create-rule.js.map