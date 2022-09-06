import * as utils from "../../utils";
export interface Options {
    readonly selector: utils.Selector;
}
export declare enum MessageId {
    invalidExport = "invalidExport"
}
export declare const preferOnlyExport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, object, never>, import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
//# sourceMappingURL=prefer-only-export.d.ts.map