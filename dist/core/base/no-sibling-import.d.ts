import { is } from "real-fns";
import type { strings } from "type-essentials";
export interface Suboptions {
    readonly _id: string;
    readonly hierarchy: stringsArray;
}
export declare type stringsArray = readonly strings[];
export declare enum MessageId {
    disallowedSource = "disallowedSource"
}
export declare const isStringsArray: is.Guard<readonly (readonly string[])[]>;
export declare const isSuboptions: is.Guard<Suboptions>;
export declare const noSiblingImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<object, Suboptions, "rules">, import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleListener>;
//# sourceMappingURL=no-sibling-import.d.ts.map