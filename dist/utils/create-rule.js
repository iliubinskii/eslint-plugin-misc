"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = void 0;
const tslib_1 = require("tslib");
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
    const { create, defaultOptions, defaultSuboptions, docs: rawDocs, fixable, messages, suboptionsKey, vue } = options;
    const docs = Object.assign({ recommended: false, requiresTypeChecking: true }, real_fns_1.o.removeUndefinedKeys.alt(Object.assign(Object.assign({}, rawDocs), { defaultOptions,
        defaultSuboptions, description: real_fns_1.s.unpadMultiline(rawDocs.description), failExamples: real_fns_1.s.unpadMultiline(rawDocs.failExamples), passExamples: real_fns_1.s.unpadMultiline(rawDocs.passExamples), suboptionsKey })));
    const ruleCreator = utils_1.ESLintUtils.RuleCreator((name) => `https://iliubinskii.github.io/eslint-plugin-misc/${name}.html`);
    return ruleCreator({
        create: (rawContext, rawOptions) => {
            const { parserServices } = rawContext;
            const context = (0, create_rule_internal_1.createContext)(rawContext, rawOptions, options);
            const typeCheck = (0, real_fns_1.classToInterface)(new TypeCheck_1.TypeCheck(rawContext));
            const result = create(context, typeCheck);
            if (vue && real_fns_1.is.not.empty(parserServices)) {
                const defineTemplateBodyVisitor = real_fns_1.o.get(parserServices, "defineTemplateBodyVisitor");
                if (real_fns_1.is.callable(defineTemplateBodyVisitor)) {
                    const { "Program:exit": oldProgramExit } = result, oldVisitors = tslib_1.__rest(result, ["Program:exit"]);
                    const _a = defineTemplateBodyVisitor(oldVisitors, oldVisitors), { "Program:exit": newProgramExit } = _a, newVisitors = tslib_1.__rest(_a, ["Program:exit"]);
                    return Object.assign(Object.assign({}, newVisitors), { "Program:exit": (node) => {
                            if (real_fns_1.is.callable(newProgramExit))
                                newProgramExit(node);
                            if (real_fns_1.is.callable(oldProgramExit))
                                oldProgramExit(node);
                        } });
                }
            }
            return result;
        },
        defaultOptions: [defaultOptions !== null && defaultOptions !== void 0 ? defaultOptions : {}],
        meta: Object.assign({ docs,
            messages, schema: [{}], type: "suggestion" }, real_fns_1.o.removeUndefinedKeys.alt({ fixable })),
        name: options.name
    });
}
exports.createRule = createRule;
//# sourceMappingURL=create-rule.js.map