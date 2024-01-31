import * as _ from "lodash-commonjs-es";
import * as utils from "../../utils";
import { a, is } from "typescript-misc";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
export var MessageId;
(function (MessageId) {
    MessageId["inconsistentMember"] = "inconsistentMember";
})(MessageId || (MessageId = {}));
export const consistentEnumMembers = utils.createRule({
    name: "consistent-enum-members",
    isSuboptions: is.object.factory({ _id: is.string, format: utils.isCasing, selector: utils.isSelector }, {}),
    suboptionsKey: "overrides",
    messages: { [MessageId.inconsistentMember]: "Inconsistent key-value pair" },
    docs: {
        description: "Requires consistent key-value pairs inside enums (key should match value).",
        suboptionTypes: {
            _id: "string",
            format: '"PascalCase" | "camelCase" | "kebab-case"',
            selector: "string | string[]"
        },
        suboptionDescriptions: {
            _id: "Id",
            format: "Overrides default file name format",
            selector: "Triggers override when AST element matching AST selector is found"
        },
        failExamples: `
      enum Enum {
        a = "b"
      }
    `,
        passExamples: `
      enum Enum {
        a = "a"
      }
    `
    },
    create: (context) => {
        const items = [];
        return utils.mergeListeners(...context.options.overrides.map((suboptions) => {
            const selector = utils.selector(suboptions.selector);
            return {
                [selector]: (node) => {
                    if (node.type === AST_NODE_TYPES.TSEnumMember)
                        items.push({ node, suboptions });
                }
            };
        }), {
            "Program:exit": () => {
                const sortedItems = _.uniqBy(a.sort(items, reverseCompare), item => item.node);
                for (const item of sortedItems) {
                    const { node, suboptions } = item;
                    if (node.id.type === AST_NODE_TYPES.Identifier &&
                        node.initializer &&
                        node.initializer.type === AST_NODE_TYPES.Literal &&
                        node.initializer.value !==
                            utils.setCasing(node.id.name, suboptions?.format))
                        context.report({ messageId: MessageId.inconsistentMember, node });
                }
            },
            "TSEnumMember": node => {
                items.push({ node });
            }
        });
    }
});
/**
 * Compares items.
 *
 * @param item1 - First item.
 * @param item2 - Second item.
 * @returns - Comparison result.
 */
function reverseCompare(item1, item2) {
    if (item1.suboptions && item2.suboptions)
        return utils.compare(item2.suboptions._id, item1.suboptions._id);
    if (item2.suboptions)
        return 1;
    if (item1.suboptions)
        return -1;
    return 0;
}
//# sourceMappingURL=consistent-enum-members.js.map