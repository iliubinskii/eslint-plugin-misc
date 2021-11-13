"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireSyntax = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["customMessage"] = "customMessage";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.requireSyntax = utils.createRule({
    name: "require-syntax",
    vue: true,
    isOptions: functions_1.is.object.factory({ once: functions_1.is.boolean, selector: utils.isSelector, trigger: utils.isSelector }, { message: functions_1.is.string }),
    defaultOptions: { once: false, trigger: "Program" },
    messages: { [MessageId.customMessage]: "{{message}}" },
    docs: {
        description: "Requires script to contain syntax.",
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
      eslint @skylib/require-syntax: [
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
      eslint @skylib/require-syntax: [
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