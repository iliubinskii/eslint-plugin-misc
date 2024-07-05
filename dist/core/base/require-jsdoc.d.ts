import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "typescript-misc";
export type InterfaceOptions = readonly InterfaceOption[];
export interface Options extends utils.configurableSelector.Options {
    readonly interfaces: InterfaceOptions;
}
export declare enum InterfaceOption {
    callSignatures = "callSignatures",
    constructSignatures = "constructSignatures",
    interface = "interface"
}
export declare enum MessageId {
    undocumented = "undocumented",
    undocumentedCallSignature = "undocumentedCallSignature",
    undocumentedConstructSignature = "undocumentedConstructSignature"
}
export declare const isInterfaceOption: is.Guard<InterfaceOption>;
export declare const isInterfaceOptions: is.Guard<readonly InterfaceOption[]>;
export declare const requireJsdoc: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=require-jsdoc.d.ts.map