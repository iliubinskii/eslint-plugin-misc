"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const TypeCheck_1 = require("./TypeCheck");
const create_rule_internal_1 = require("./create-rule.internal");
/**
 * Creates rule listenter.
 *
 * @param options - Options.
 * @returns Rule listenter.
 */
function createRule(options) {
    const { create, defaultOptions, defaultSuboptions, docs: rawDocs, fixable, messages, suboptionsKey, vue } = options;
    const docs = Object.assign({ recommended: false, requiresTypeChecking: true }, functions_1.o.removeUndefinedKeys(Object.assign(Object.assign({}, rawDocs), { defaultOptions,
        defaultSuboptions, description: functions_1.s.unpadMultiline(rawDocs.description), failExamples: functions_1.s.unpadMultiline(rawDocs.failExamples), passExamples: functions_1.s.unpadMultiline(rawDocs.passExamples), suboptionsKey })));
    const ruleCreator = utils_1.ESLintUtils.RuleCreator((name) => `https://ilyub.github.io/eslint-plugin/${name}.html`);
    return ruleCreator({
        create: (rawContext, rawOptions) => {
            const { parserServices } = rawContext;
            const context = (0, create_rule_internal_1.createContext)(rawContext, rawOptions, options);
            const typeCheck = (0, functions_1.classToInterface)(new TypeCheck_1.TypeCheck(rawContext));
            const result = create(context, typeCheck);
            if (vue && functions_1.is.not.empty(parserServices)) {
                const defineTemplateBodyVisitor = functions_1.o.get(parserServices, "defineTemplateBodyVisitor");
                if (functions_1.is.callable(defineTemplateBodyVisitor)) {
                    const { "Program:exit": oldProgramExit } = result, oldVisitors = tslib_1.__rest(result, ["Program:exit"]);
                    const _a = defineTemplateBodyVisitor(oldVisitors, oldVisitors), { "Program:exit": newProgramExit } = _a, newVisitors = tslib_1.__rest(_a, ["Program:exit"]);
                    return Object.assign(Object.assign({}, newVisitors), { "Program:exit": (node) => {
                            if (functions_1.is.callable(newProgramExit))
                                newProgramExit(node);
                            if (functions_1.is.callable(oldProgramExit))
                                oldProgramExit(node);
                        } });
                }
            }
            return result;
        },
        defaultOptions: [defaultOptions !== null && defaultOptions !== void 0 ? defaultOptions : {}],
        meta: Object.assign({ docs,
            messages, schema: [{}], type: "suggestion" }, functions_1.o.removeUndefinedKeys({ fixable })),
        name: options.name
    });
}
exports.createRule = createRule;
//# sourceMappingURL=create-rule.js.map