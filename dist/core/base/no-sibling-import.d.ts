import { is } from "typescript-misc";
import type { strings } from "typescript-misc";
export interface Suboptions {
    readonly _id: string;
    readonly hierarchy: stringsArray;
}
export type stringsArray = readonly strings[];
export declare enum MessageId {
    disallowedSource = "disallowedSource"
}
export declare const isStringsArray: is.Guard<readonly (readonly string[])[]>;
export declare const isSuboptions: is.Guard<Suboptions>;
export declare const noSiblingImport: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<object, Suboptions, "rules">, import("@typescript-eslint/utils/dist/ts-eslint").RuleListener>;
//# sourceMappingURL=no-sibling-import.d.ts.map