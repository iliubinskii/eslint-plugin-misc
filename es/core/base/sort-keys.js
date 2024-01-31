import * as _ from "lodash-commonjs-es";
import * as utils from "../../utils";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
import { is } from "typescript-misc";
export var MessageId;
(function (MessageId) {
    MessageId["expectingObject"] = "expectingObject";
})(MessageId || (MessageId = {}));
export const sortKeys = utils.createRule({
    name: "sort-keys",
    fixable: utils.Fixable.code,
    isSuboptions: is.object.factory({ _id: is.string, selector: utils.isSelector }, { customOrder: is.strings, sendToBottom: is.string, sendToTop: is.string }),
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
                    if (node.type === AST_NODE_TYPES.ObjectExpression)
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
            return node.type === AST_NODE_TYPES.SpreadElement ? undefined : node.key;
        }
    }
});
//# sourceMappingURL=sort-keys.js.map