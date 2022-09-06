import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly checkArrayType: boolean;
    readonly checkReturnType: boolean;
    readonly ignoreSelector: utils.Selector;
    readonly message?: string;
    readonly replacement?: string;
    readonly search?: string;
    readonly selector: utils.Selector;
    readonly typeHas?: utils.TypeGroup;
    readonly typeHasNoneOf?: utils.TypeGroups;
    readonly typeHasOneOf?: utils.TypeGroups;
    readonly typeIs?: utils.TypeGroup;
    readonly typeIsNoneOf?: utils.TypeGroups;
    readonly typeIsOneOf?: utils.TypeGroups;
}
export declare enum MessageId {
    customMessage = "customMessage"
}
export declare const noRestrictedSyntax: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=no-restricted-syntax.d.ts.map