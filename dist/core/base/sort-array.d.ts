import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "typescript-misc";
export interface Options {
    readonly customOrder?: strings;
    readonly selector: utils.Selector;
    readonly sendToBottom?: string;
    readonly sendToTop?: string;
    readonly sortKey?: string;
    readonly triggerByComment: boolean;
}
export declare enum MessageId {
    expectingArray = "expectingArray"
}
export declare const sortArray: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<import("../../utils/sort").MessageId | MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=sort-array.d.ts.map