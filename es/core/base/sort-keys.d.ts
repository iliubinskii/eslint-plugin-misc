import * as utils from "../../utils";
import type { strings } from "typescript-misc";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Suboptions {
    readonly _id: string;
    readonly customOrder?: strings;
    readonly selector: utils.Selector;
    readonly sendToBottom?: string;
    readonly sendToTop?: string;
}
export declare enum MessageId {
    expectingObject = "expectingObject"
}
export declare const sortKeys: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<import("../../utils/sort").MessageId | MessageId, import("../../utils/create-rule").PartialOptionsArray<object, Suboptions, "overrides">, RuleListener>;
//# sourceMappingURL=sort-keys.d.ts.map