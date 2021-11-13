import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "@skylib/functions";
export declare type InterfaceOptions = readonly InterfaceOption[];
export interface Options extends utils.configurableSelector.Options {
    readonly interfaces: InterfaceOptions;
    readonly properties: PropertyOptions;
}
export declare type PropertyOptions = readonly PropertyOption[];
export declare enum PropertyOption {
    function = "function",
    nonFunction = "nonFunction"
}
export declare const isPropertyOption: is.Guard<PropertyOption>;
export declare const isPropertyOptions: is.Guard<readonly PropertyOption[]>;
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
export declare const requireJsdoc: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=require-jsdoc.d.ts.map