import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export declare enum MessageId {
    preferMultiline = "preferMultiline",
    preferSingleLine = "preferSingleLine"
}
export declare const objectFormat: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, RuleListener>;
export interface Options {
    readonly maxLineLength: number;
    readonly maxObjectSize: number;
}
//# sourceMappingURL=object-format.d.ts.map