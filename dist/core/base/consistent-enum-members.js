"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentEnumMembers = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const real_fns_1 = require("real-fns");
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["inconsistentMember"] = "inconsistentMember";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.consistentEnumMembers = utils.createRule({
    name: "consistent-enum-members",
    isSuboptions: real_fns_1.is.object.factory({ _id: real_fns_1.is.string, format: utils.isCasing, selector: utils.isSelector }, {}),
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
                    if (node.type === utils_1.AST_NODE_TYPES.TSEnumMember)
                        items.push({ node, suboptions });
                }
            };
        }), {
            "Program:exit": () => {
                const sortedItems = _.uniqBy(real_fns_1.a.sort(items, reverseCompare), item => item.node);
                for (const item of sortedItems) {
                    const { node, suboptions } = item;
                    if (node.id.type === utils_1.AST_NODE_TYPES.Identifier &&
                        node.initializer &&
                        node.initializer.type === utils_1.AST_NODE_TYPES.Literal &&
                        node.initializer.value !==
                            utils.setCasing(node.id.name, suboptions === null || suboptions === void 0 ? void 0 : suboptions.format))
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