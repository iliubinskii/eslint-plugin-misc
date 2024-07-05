"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sort = exports.MessageId = void 0;
const typescript_misc_1 = require("typescript-misc");
const compare_1 = require("./compare");
const misc_1 = require("./misc");
var MessageId;
(function (MessageId) {
    MessageId["incorrectSortingOrder"] = "incorrectSortingOrder";
    MessageId["incorrectSortingOrderId"] = "incorrectSortingOrderId";
})(MessageId || (exports.MessageId = MessageId = {}));
// eslint-disable-next-line import/export -- Ok
exports.sort = (0, typescript_misc_1.defineFn)(
/**
 * Sorts nodes.
 * @param nodes - Nodes.
 * @param context - Context.
 * @param options - Options.
 */
(nodes, context, options) => {
    const { customOrder, keyNode, sendToBottom, sendToTop, sortingOrder } = {
        customOrder: [],
        keyNode: typescript_misc_1.fn.never,
        sortingOrder: (node) => {
            const kNode = keyNode(node);
            if (kNode) {
                const key = (0, misc_1.nodeText)(kNode, () => context.getText(kNode));
                const index = customOrder.indexOf(key);
                if (index >= 0)
                    return `${1000 + index}`;
                if (sendToTopRe && sendToTopRe.test(key))
                    return `2001\u0001${key}`;
                if (sendToBottomRe && sendToBottomRe.test(key))
                    return `2003\u0001${key}`;
                return `2002\u0001${key}`;
            }
            return undefined;
        },
        ...options
    };
    const sendToTopRe = typescript_misc_1.is.not.empty(sendToTop)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
            new RegExp(sendToTop, "u")
        : undefined;
    const sendToBottomRe = typescript_misc_1.is.not.empty(sendToBottom)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
            new RegExp(sendToBottom, "u")
        : undefined;
    const items = [];
    for (const node of nodes) {
        const key = sortingOrder(node);
        if (typescript_misc_1.is.not.empty(key))
            items.push({ index: 0, key, node });
        else {
            sortGroup(items, options, context);
            typescript_misc_1.a.truncate(items);
        }
    }
    sortGroup(items, options, context);
}, {
    MessageId,
    messages: {
        [MessageId.incorrectSortingOrder]: "Incorrect sorting order",
        [MessageId.incorrectSortingOrderId]: "Incorrect sorting order ({{_id}})"
    }
});
/**
 * Sorts items.
 * @param items - Items.
 * @param options - Options.
 * @param context - Context.
 */
function sortGroup(items, options, context) {
    if (items.length >= 2) {
        const { _id } = options;
        const sortedItems = typescript_misc_1.a.sort(items.map((item, index) => {
            return { ...item, index };
        }), (item1, item2) => (0, compare_1.compare)(item1.key, item2.key));
        const fixes = [];
        let min;
        let max;
        for (const [index, sortedItem] of sortedItems.entries())
            if (sortedItem.index === index) {
                // Valid
            }
            else {
                const item = typescript_misc_1.a.get(items, index);
                min = typescript_misc_1.is.not.empty(min) ? Math.min(min, index) : index;
                max = typescript_misc_1.is.not.empty(max) ? Math.max(max, index) : index;
                fixes.push({
                    range: context.getFullRange(item.node),
                    text: context.getFullText(sortedItem.node)
                });
            }
        if (fixes.length > 0) {
            const loc = context.getLoc([
                typescript_misc_1.a.get(items, typescript_misc_1.as.not.empty(min)).node.range[0],
                typescript_misc_1.a.get(items, typescript_misc_1.as.not.empty(max)).node.range[1]
            ]);
            if (typescript_misc_1.is.not.empty(_id))
                context.report({
                    data: { _id },
                    fix: () => fixes,
                    loc,
                    messageId: MessageId.incorrectSortingOrderId
                });
            else
                context.report({
                    fix: () => fixes,
                    loc,
                    messageId: MessageId.incorrectSortingOrder
                });
        }
    }
}
//# sourceMappingURL=sort.js.map