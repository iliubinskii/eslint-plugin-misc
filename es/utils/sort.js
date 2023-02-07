import { a, as, defineFn, fn, is } from "real-fns";
import { MessageId } from "./sort.internal";
import { compare } from "./compare";
import { nodeText } from "./misc";
export const sort = defineFn(
/**
 * Sorts nodes.
 *
 * @param nodes - Nodes.
 * @param context - Context.
 * @param options - Options.
 */
(nodes, context, options) => {
    const { customOrder, keyNode, sendToBottom, sendToTop, sortingOrder } = Object.assign({ customOrder: [], keyNode: fn.never, sortingOrder: (node) => {
            const kNode = keyNode(node);
            if (kNode) {
                const key = nodeText(kNode, () => `\u0002${context.getText(kNode)}`);
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
        } }, options);
    const sendToTopRe = is.not.empty(sendToTop)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
            new RegExp(sendToTop, "u")
        : undefined;
    const sendToBottomRe = is.not.empty(sendToBottom)
        ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
            new RegExp(sendToBottom, "u")
        : undefined;
    const items = [];
    for (const node of nodes) {
        const key = sortingOrder(node);
        if (is.not.empty(key))
            items.push({ index: 0, key, node });
        else {
            sortGroup(items, options, context);
            a.truncate(items);
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
 *
 * @param items - Items.
 * @param options - Options.
 * @param context - Context.
 */
function sortGroup(items, options, context) {
    if (items.length >= 2) {
        const { _id } = options;
        const sortedItems = a.sort(items.map((item, index) => (Object.assign(Object.assign({}, item), { index }))), (item1, item2) => compare(item1.key, item2.key));
        const fixes = [];
        let min;
        let max;
        for (const [index, sortedItem] of sortedItems.entries())
            if (sortedItem.index === index) {
                // Valid
            }
            else {
                const item = a.get(items, index);
                min = is.not.empty(min) ? Math.min(min, index) : index;
                max = is.not.empty(max) ? Math.max(max, index) : index;
                fixes.push({
                    range: context.getFullRange(item.node),
                    text: context.getFullText(sortedItem.node)
                });
            }
        if (fixes.length) {
            const loc = context.getLoc([
                a.get(items, as.not.empty(min)).node.range[0],
                a.get(items, as.not.empty(max)).node.range[1]
            ]);
            if (is.not.empty(_id))
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