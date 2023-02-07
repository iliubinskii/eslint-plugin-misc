import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly ignoreSelector: utils.Selector;
    readonly message?: string;
    readonly replacement?: string;
    readonly search?: string;
    readonly selector: utils.Selector;
}
export declare enum MessageId {
    customMessage = "customMessage"
}
export declare const noRestrictedSyntax: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=no-restricted-syntax.d.ts.map