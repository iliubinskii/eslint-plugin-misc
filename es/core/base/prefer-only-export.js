import * as ruleTemplates from "../../rule-templates";
import * as utils from "../../utils";
import { is } from "real-fns";
export var MessageId;
(function (MessageId) {
    MessageId["invalidExport"] = "invalidExport";
})(MessageId || (MessageId = {}));
export const preferOnlyExport = utils.createRule({
    name: "prefer-only-export",
    isOptions: is.object.factory({ selector: utils.isSelector }, {}),
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