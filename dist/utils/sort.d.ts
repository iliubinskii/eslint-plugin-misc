import type { Context } from "./types";
import type { KeyNode, SortingOrder } from "./sort.internal";
import type { strings } from "@skylib/functions";
import { MessageId } from "./sort.internal";
import type { TSESTree } from "@typescript-eslint/utils";
export declare const sort: (<T extends TSESTree.Node = TSESTree.Node>(nodes: readonly T[], context: Context<MessageId, object, object>, options: sort.Options<T>) => void) & Readonly<{
    MessageId: typeof MessageId;
    messages: {
        readonly incorrectSortingOrder: "Incorrect sorting order";
        readonly incorrectSortingOrderId: "Incorrect sorting order ({{_id}})";
    };
}>;
export declare namespace sort {
    type MessageId = import("./sort.internal").MessageId;
    interface Options<T extends TSESTree.Node> {
        readonly _id?: string;
        readonly customOrder?: strings;
        readonly keyNode?: KeyNode<T>;
        readonly sendToBottom?: string;
        readonly sendToTop?: string;
        readonly sortingOrder?: SortingOrder<T>;
    }
}
//# sourceMappingURL=sort.d.ts.map