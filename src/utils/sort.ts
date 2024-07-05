import type { Context, RuleFixes } from "./types";
import type { Writable, numberU, stringU, strings } from "typescript-misc";
import { a, as, defineFn, fn, is } from "typescript-misc";
import type { TSESTree } from "@typescript-eslint/utils";
import { compare } from "./compare";
import { nodeText } from "./misc";

export enum MessageId {
  incorrectSortingOrder = "incorrectSortingOrder",
  incorrectSortingOrderId = "incorrectSortingOrderId"
}

// eslint-disable-next-line import/export -- Ok
export const sort = defineFn(
  /**
   * Sorts nodes.
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
          const key = nodeText(kNode, () => context.getText(kNode));

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

// eslint-disable-next-line import/export -- Ok
export namespace sort {
  export interface Options<T extends TSESTree.Node> {
    readonly _id?: string;
    readonly customOrder?: strings;
    readonly keyNode?: KeyNode<T>;
    readonly sendToBottom?: string;
    readonly sendToTop?: string;
    readonly sortingOrder?: SortingOrder<T>;
  }
}

export interface KeyNode<T extends TSESTree.Node> {
  /**
   * Returns key node.
   * @param node - Node.
   * @returns Key node.
   */
  (node: T): TSESTree.Node | undefined;
}

export interface SortingOrder<T extends TSESTree.Node> {
  /**
   * Returns sorting order..
   * @param node - Node.
   * @returns Sorting order.
   */
  (node: T): stringU;
}

/**
 * Sorts items.
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
    const { _id } = options;

    const sortedItems = a.sort(
      items.map((item, index): Item => {
        return { ...item, index };
      }),
      (item1, item2) => compare(item1.key, item2.key)
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

    if (fixes.length > 0) {
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

interface Item {
  readonly index: number;
  readonly key: string;
  readonly node: TSESTree.Node;
}

type Items = readonly Item[];
