import * as utils from "../../utils";
export declare enum MessageId {
    disallowedSource = "disallowedSource"
}
export declare const disallowImport: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
export interface Options {
    readonly allow: utils.FilePattern;
    readonly disallow: utils.FilePattern;
}
//# sourceMappingURL=disallow-import.d.ts.map