"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortKeys = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
const typescript_misc_1 = require("typescript-misc");
var MessageId;
(function (MessageId) {
    MessageId["expectingObject"] = "expectingObject";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.sortKeys = utils.createRule({
    name: "sort-keys",
    fixable: utils.Fixable.code,
    isSuboptions: typescript_misc_1.is.object.factory({ _id: typescript_misc_1.is.string, selector: utils.isSelector }, { customOrder: typescript_misc_1.is.strings, sendToBottom: typescript_misc_1.is.string, sendToTop: typescript_misc_1.is.string }),
    suboptionsKey: "overrides",
    messages: {
        ...utils.sort.messages,
        [MessageId.expectingObject]: "Expecting object ({{_id}})"
    },
    docs: {
        description: "Sorts object keys.",
        suboptionTypes: {
            _id: "string",
            customOrder: "string[]",
            selector: "string | string[]",
            sendToBottom: "string",
            sendToTop: "string"
        },
        suboptionDescriptions: {
            _id: "Id",
            customOrder: "Array elements with custom order",
            selector: "AST elements to be sorted (AST selector)",
            sendToBottom: "Array elements that should be sent to bottom",
            sendToTop: "Array elements that should be sent to top"
        },
        failExamples: `
      export default {
        b: 1,
        a: 2
      }
    `,
        passExamples: `
      export default {
        a: 1,
        b: 2
      }
    `
    },
    create: (context) => {
        const items = [];
        const overrides = [];
        return utils.mergeListeners(...context.options.overrides.map((override) => {
            const { _id, selector: mixedSelector } = override;
            const selector = utils.selector(mixedSelector);
            return {
                [selector]: (node) => {
                    if (node.type === utils_1.AST_NODE_TYPES.ObjectExpression)
                        overrides.push({ node, options: { ...override, keyNode } });
                    else
                        context.report({
                            data: { _id },
                            messageId: MessageId.expectingObject,
                            node
                        });
                }
            };
        }), {
            "ObjectExpression": node => {
                items.push({ node, options: { keyNode } });
            },
            "Program:exit": () => {
                for (const item of _.uniqBy([...overrides, ...items], "node"))
                    utils.sort(item.node.properties, context, item.options);
            }
        });
        function keyNode(node) {
            return node.type === utils_1.AST_NODE_TYPES.SpreadElement ? undefined : node.key;
        }
    }
});
//# sourceMappingURL=sort-keys.js.map