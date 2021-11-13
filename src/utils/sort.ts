import type { Context, RuleFixes } from "./types";
import type { KeyNode, SortingOrder } from "./sort.internal";
import type { Writable, numberU, stringU, strings } from "@skylib/functions";
import { a, as, defineFn, fn, is } from "@skylib/functions";
import { MessageId } from "./sort.internal";
import type { TSESTree } from "@typescript-eslint/utils";
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
  <T extends TSESTree.Node = TSESTree.Node>(
    nodes: readonly T[],
    context: Context<MessageId, object, object>,
    options: sort.Options<T>
  ): void => {
    const { customOrder, keyNode, sendToBottom, sendToTop, sortingOrder } = {
      customOrder: [],
      keyNode: fn.never as KeyNode<T>,
      sortingOrder: (node: T): stringU => {
        const kNode = keyNode(node);

        if (kNode) {
          const key = nodeText(kNode, () => `\u0002${context.getText(kNode)}`);

          const index = customOrder.indexOf(key);

          if (index >= 0) return `${1000 + index}`;

          if (sendToTopRe && sendToTopRe.test(key)) return `2001\u0001${key}`;

          if (sendToBottomRe && sendToBottomRe.test(key))
            return `2003\u0001${key}`;

          return `2002\u0001${key}`;
        }

        return undefined;
      },
      ...options
    } as const;

    const sendToTopRe = is.not.empty(sendToTop)
      ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
        new RegExp(sendToTop, "u")
      : undefined;

    const sendToBottomRe = is.not.empty(sendToBottom)
      ? // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
        new RegExp(sendToBottom, "u")
      : undefined;

    const items: Writable<Items> = [];

    for (const node of nodes) {
      const key = sortingOrder(node);

      if (is.not.empty(key)) items.push({ index: 0, key, node });
      else {
        sortGroup(items, options, context);
        a.truncate(items);
      }
    }

    sortGroup(items, options, context);
  },
  {
    MessageId,
    messages: {
      [MessageId.incorrectSortingOrder]: "Incorrect sorting order",
      [MessageId.incorrectSortingOrderId]: "Incorrect sorting order ({{_id}})"
    } as const
  }
);

// eslint-disable-next-line @typescript-eslint/no-redeclare -- Ok
export namespace sort {
  export type MessageId = import("./sort.internal").MessageId;

  export interface Options<T extends TSESTree.Node> {
    readonly _id?: string;
    readonly customOrder?: strings;
    readonly keyNode?: KeyNode<T>;
    readonly sendToBottom?: string;
    readonly sendToTop?: string;
    readonly sortingOrder?: SortingOrder<T>;
  }
}

interface Item {
  readonly index: number;
  readonly key: string;
  readonly node: TSESTree.Node;
}

type Items = readonly Item[];

/**
 * Sorts items.
 *
 * @param items - Items.
 * @param options - Options.
 * @param context - Context.
 */
function sortGroup<T extends TSESTree.Node = TSESTree.Node>(
  items: Items,
  options: sort.Options<T>,
  context: Context<MessageId, object, object>
): void {
  if (items.length >= 2) {
    items = items.map((item, index): Item => ({ ...item, index }));

    const { _id } = options;

    const sortedItems = a.sort(items, (item1, item2) =>
      compare(item1.key, item2.key)
    );

    const fixes: Writable<RuleFixes> = [];

    let min: numberU;

    let max: numberU;

    for (const [index, sortedItem] of sortedItems.entries())
      if (sortedItem.index === index) {
        // Valid
      } else {
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

      context.report(
        is.not.empty(_id)
          ? {
              data: { _id },
              fix: () => fixes,
              loc,
              messageId: MessageId.incorrectSortingOrderId
            }
          : {
              fix: () => fixes,
              loc,
              messageId: MessageId.incorrectSortingOrder
            }
      );
    }
  }
}
