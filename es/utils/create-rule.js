import { __rest } from "tslib";
import { classToInterface, is, o, s } from "real-fns";
import { ESLintUtils } from "@typescript-eslint/utils";
import { TypeCheck } from "./TypeCheck";
import { createContext } from "./create-rule.internal";
/**
 * Creates rule listenter.
 *
 * @param options - Options.
 * @returns Rule listenter.
 */
export function createRule(options) {
    const { create, defaultOptions, defaultSuboptions, docs: rawDocs, fixable, messages, suboptionsKey, vue } = options;
    const docs = Object.assign({ recommended: false, requiresTypeChecking: true }, o.removeUndefinedKeys.alt(Object.assign(Object.assign({}, rawDocs), { defaultOptions,
        defaultSuboptions, description: s.unpadMultiline(rawDocs.description), failExamples: s.unpadMultiline(rawDocs.failExamples), passExamples: s.unpadMultiline(rawDocs.passExamples), suboptionsKey })));
    const ruleCreator = ESLintUtils.RuleCreator((name) => `https://ilyub.github.io/eslint-plugin-misc/${name}.html`);
    return ruleCreator({
        create: (rawContext, rawOptions) => {
            const { parserServices } = rawContext;
            const context = createContext(rawContext, rawOptions, options);
            const typeCheck = classToInterface(new TypeCheck(rawContext));
            const result = create(context, typeCheck);
            if (vue && is.not.empty(parserServices)) {
                const defineTemplateBodyVisitor = o.get(parserServices, "defineTemplateBodyVisitor");
                if (is.callable(defineTemplateBodyVisitor)) {
                    const { "Program:exit": oldProgramExit } = result, oldVisitors = __rest(result, ["Program:exit"]);
                    const _a = defineTemplateBodyVisitor(oldVisitors, oldVisitors), { "Program:exit": newProgramExit } = _a, newVisitors = __rest(_a, ["Program:exit"]);
                    return Object.assign(Object.assign({}, newVisitors), { "Program:exit": (node) => {
                            if (is.callable(newProgramExit))
                                newProgramExit(node);
                            if (is.callable(oldProgramExit))
                                oldProgramExit(node);
                        } });
                }
            }
            return result;
        },
        defaultOptions: [defaultOptions !== null && defaultOptions !== void 0 ? defaultOptions : {}],
        meta: Object.assign({ docs,
            messages, schema: [{}], type: "suggestion" }, o.removeUndefinedKeys.alt({ fixable })),
        name: options.name
    });
}
//# sourceMappingURL=create-rule.js.map