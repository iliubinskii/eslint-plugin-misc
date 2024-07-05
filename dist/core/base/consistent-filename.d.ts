import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export declare enum MessageId {
    invalidFilename = "invalidFilename",
    invalidFilenameId = "invalidFilenameId"
}
export declare const consistentFilename: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, Suboptions, "overrides">, RuleListener>;
export interface Options {
    readonly format: utils.Casing;
}
export interface Suboptions {
    readonly _id: string;
    readonly format?: utils.Casing;
    readonly match: boolean;
    readonly selector: utils.Selector;
}
//# sourceMappingURL=consistent-filename.d.ts.map