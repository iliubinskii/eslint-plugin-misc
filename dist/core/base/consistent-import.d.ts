import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "typescript-misc";
export declare enum MessageId {
    autoImport = "autoImport",
    invalidLocalName = "invalidLocalName",
    wildcardDisallowed = "wildcardDisallowed",
    wildcardRequired = "wildcardRequired"
}
export declare const consistentImport: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<object, Suboptions, "sources">, RuleListener>;
export interface Suboptions {
    readonly _id: string;
    readonly altLocalNames: strings;
    readonly autoImport: boolean;
    readonly autoImportSource?: string;
    readonly localName?: string;
    readonly source: string;
    readonly sourcePattern?: string;
    readonly wildcard: boolean;
}
//# sourceMappingURL=consistent-import.d.ts.map