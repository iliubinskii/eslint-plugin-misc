import * as utils from "../../utils";
import { is } from "real-fns";
export var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId || (MessageId = {}));
export const requireSyntax = utils.createRule({
    name: "require-syntax",
    vue: true,
    isOptions: is.object.factory({ once: is.boolean, selector: utils.isSelector, trigger: utils.isSelector }, { message: is.string }),
    defaultOptions: { once: false, trigger: "Program" },
    messages: { [MessageId.customMessage]: "{{message}}" },
    docs: {
        description: "Requires AST syntax.",
        optionTypes: {
            message: "string",
            once: "boolean",
            selector: "string | string[]",
            trigger: "string | string[]"
        },
        optionDescriptions: {
            message: "Custom message",
            once: "Syntax should be found exactly one time",
            selector: "AST selector",
            trigger: "Trigger rule by AST selector"
        },
        failExamples: `
      /*
      eslint misc/require-syntax: [
        error,
        {
          selector: "Identifier[name=x]",
          trigger: "Identifier[name=y]"
        }
      ]
      */
      export const y = 1;
    `,
        passExamples: `
      /*
      eslint misc/require-syntax: [
        error,
        {
          selector: "Identifier[name=x]",
          trigger: "Identifier[name=y]"
        }
      ]
      */
      export const x = 1;
      export const y = 1;
    `
    },
    create: (context) => {
        const { message, once, selector: mixedSelector, trigger: mixedTrigger } = context.options;
        const selector = utils.selector(mixedSelector);
        const trigger = utils.selector(mixedTrigger);
        let count = 0;
        const nodes = [];
        return utils.mergeListeners({
            [selector]: () => {
                count++;
            }
        }, {
            [trigger]: (node) => {
                nodes.push(node);
            }
        }, {
            "Program:exit": () => {
                for (const node of nodes)
                    if (count === 0 || (count > 1 && once)) {
                        const defaultMessage = count === 0
                            ? `Missing syntax: ${selector}`
                            : `Require syntax once: ${selector}`;
                        const loc = trigger === "Program"
                            ? context.locZero
                            : context.getLoc(node.range);
                        context.report({
                            data: { message: message !== null && message !== void 0 ? message : defaultMessage },
                            loc,
                            messageId: MessageId.customMessage
                        });
                    }
            }
        });
    }
});
//# sourceMappingURL=require-syntax.js.map