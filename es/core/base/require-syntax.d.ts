import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export declare enum MessageId {
    customMessage = "customMessage"
}
export declare const requireSyntax: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, RuleListener>;
export interface Options {
    readonly message?: string;
    readonly once: boolean;
    readonly selector: utils.Selector;
    readonly trigger: utils.Selector;
}
//# sourceMappingURL=require-syntax.d.ts.map