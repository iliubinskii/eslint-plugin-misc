"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferOnlyExport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const ruleTemplates = tslib_1.__importStar(require("../../rule-templates"));
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_misc_1 = require("typescript-misc");
var MessageId;
(function (MessageId) {
    MessageId["invalidExport"] = "invalidExport";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.preferOnlyExport = utils.createRule({
    name: "prefer-only-export",
    isOptions: typescript_misc_1.is.object.factory({ selector: utils.isSelector }, {}),
    defaultOptions: { selector: [] },
    messages: { [MessageId.invalidExport]: "Expecting only export" },
    docs: {
        description: "Requires only export if given AST element is found.",
        optionTypes: { selector: "string | string[]" },
        optionDescriptions: { selector: "AST selector" },
        failExamples: `
      /*
      eslint misc/prefer-only-export: [
        error,
        {
          selector: "Program > ExportNamedDeclaration > ClassDeclaration"
        }
      ]
      */
      export class SampleClass {}
      export const x = 1;
    `,
        passExamples: `
      /*
      eslint misc/prefer-only-export: [
        error,
        {
          selector: "Program > ExportNamedDeclaration > ClassDeclaration"
        }
      ]
      */
      export class SampleClass {}
    `
    },
    create: context => {
        const { selector: mixedSelector } = context.options;
        const selector = utils.selector(mixedSelector);
        let activated = false;
        return utils.mergeListeners({
            [selector]: () => {
                activated = true;
            }
        }, ruleTemplates.export(ctx => {
            const { identifiers, onlyExport } = ctx;
            if (activated && !onlyExport)
                for (const node of identifiers)
                    context.report({ messageId: MessageId.invalidExport, node });
        }));
    }
});
//# sourceMappingURL=prefer-only-export.js.map