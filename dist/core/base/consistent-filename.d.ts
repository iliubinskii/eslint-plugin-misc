import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly format: utils.Casing;
}
export interface Suboptions {
    readonly _id: string;
    readonly format?: utils.Casing;
    readonly match: boolean;
    readonly selector: utils.Selector;
}
export declare enum MessageId {
    invalidFilename = "invalidFilename",
    invalidFilenameId = "invalidFilenameId"
}
export declare const consistentFilename: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, Suboptions, "overrides">, RuleListener>;
//# sourceMappingURL=consistent-filename.d.ts.map