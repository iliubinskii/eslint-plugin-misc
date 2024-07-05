import * as utils from "../../utils";
export interface Options {
    readonly selector: utils.Selector;
}
export declare enum MessageId {
    invalidExport = "invalidExport"
}
export declare const preferOnlyExport: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
//# sourceMappingURL=prefer-only-export.d.ts.map