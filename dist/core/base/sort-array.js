"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortArray = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const typescript_misc_1 = require("typescript-misc");
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["expectingArray"] = "expectingArray";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.sortArray = utils.createRule({
    name: "sort-array",
    fixable: utils.Fixable.code,
    isOptions: typescript_misc_1.is.object.factory({ selector: utils.isSelector, triggerByComment: typescript_misc_1.is.boolean }, {
        customOrder: typescript_misc_1.is.strings,
        sendToBottom: typescript_misc_1.is.string,
        sendToTop: typescript_misc_1.is.string,
        sortKey: typescript_misc_1.is.string
    }),
    defaultOptions: {
        selector: utils_1.AST_NODE_TYPES.ArrayExpression,
        triggerByComment: true
    },
    messages: {
        ...utils.sort.messages,
        [MessageId.expectingArray]: "Expecting array"
    },
    docs: {
        description: "Sorts arrays.",
        optionTypes: {
            customOrder: "string[]",
            selector: "string | string[]",
            sendToBottom: "string",
            sendToTop: "string",
            sortKey: "string",
            triggerByComment: "boolean"
        },
        optionDescriptions: {
            customOrder: "Array elements with custom order",
            selector: "AST elements to be sorted (AST selector)",
            sendToBottom: "Array elements that should be sent to bottom",
            sendToTop: "Array elements that should be sent to top",
            sortKey: "Determines which object key should be used to compare objects",
            triggerByComment: 'Triggers sorting by "// @sorted" comment'
        },
        failExamples: `
      // @sorted
      const x = [2, 1];
    `,
        passExamples: `
      const x = [2, 1];
      // @sorted
      const y = [1, 2];
    `
    },
    create: (context) => {
        const { selector: mixedSelector, sortKey, triggerByComment } = context.options;
        const selector = utils.selector(mixedSelector);
        return {
            [selector]: (node) => {
                if (node.type === utils_1.AST_NODE_TYPES.ArrayExpression) {
                    const sort = triggerByComment
                        ? context.getComments(node).includes("// @sorted")
                        : true;
                    if (sort)
                        utils.sort(node.elements.map(element => typescript_misc_1.as.not.empty(element)), context, { ...context.options, keyNode });
                }
                else
                    context.report({ messageId: MessageId.expectingArray, node });
            }
        };
        function keyNode(node) {
            switch (node.type) {
                case utils_1.AST_NODE_TYPES.ObjectExpression: {
                    if (typescript_misc_1.is.not.empty(sortKey))
                        for (const property of node.properties)
                            if (property.type === utils_1.AST_NODE_TYPES.Property &&
                                utils.nodeText(property.key, "?") === sortKey)
                                return property.value;
                    return node;
                }
                case utils_1.AST_NODE_TYPES.SpreadElement: {
                    return undefined;
                }
                default: {
                    return node;
                }
            }
        }
    }
});
//# sourceMappingURL=sort-array.js.map