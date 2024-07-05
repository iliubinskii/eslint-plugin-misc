import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly maxLineLength: number;
    readonly maxObjectSize: number;
}
export declare enum MessageId {
    preferMultiline = "preferMultiline",
    preferSingleLine = "preferSingleLine"
}
export declare const objectFormat: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=object-format.d.ts.map