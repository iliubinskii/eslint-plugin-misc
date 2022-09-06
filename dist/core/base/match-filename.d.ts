import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly format?: utils.Casing;
    readonly prefix: string;
    readonly selector: utils.Selector;
    readonly suffix: string;
}
export declare enum MessageId {
    invalidText = "invalidText"
}
export declare const matchFilename: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=match-filename.d.ts.map