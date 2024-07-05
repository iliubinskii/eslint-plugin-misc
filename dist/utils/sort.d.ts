import type { Context } from "./types";
import type { stringU, strings } from "typescript-misc";
import type { TSESTree } from "@typescript-eslint/utils";
export declare enum MessageId {
    incorrectSortingOrder = "incorrectSortingOrder",
    incorrectSortingOrderId = "incorrectSortingOrderId"
}
export declare const sort: (<T extends TSESTree.Node = TSESTree.Node>(nodes: readonly T[], context: Context<MessageId, object, object>, options: sort.Options<T>) => void) & Readonly<{
    MessageId: typeof MessageId;
    messages: {
        readonly incorrectSortingOrder: "Incorrect sorting order";
        readonly incorrectSortingOrderId: "Incorrect sorting order ({{_id}})";
    };
}>;
export declare namespace sort {
    interface Options<T extends TSESTree.Node> {
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
//# sourceMappingURL=sort.d.ts.map