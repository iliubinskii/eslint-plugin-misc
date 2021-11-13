import type { TSESTree } from "@typescript-eslint/utils";
import type { stringU } from "@skylib/functions";
export declare enum MessageId {
    incorrectSortingOrder = "incorrectSortingOrder",
    incorrectSortingOrderId = "incorrectSortingOrderId"
}
export interface KeyNode<T extends TSESTree.Node> {
    /**
     * Returns key node.
     *
     * @param node - Node.
     * @returns Key node.
     */
    (node: T): TSESTree.Node | undefined;
}
export interface SortingOrder<T extends TSESTree.Node> {
    /**
     * Returns sorting order..
     *
     * @param node - Node.
     * @returns Sorting order.
     */
    (node: T): stringU;
}
//# sourceMappingURL=sort.internal.d.ts.map