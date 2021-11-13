import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "@skylib/functions";
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
export declare enum MessageId {
    autoImport = "autoImport",
    invalidLocalName = "invalidLocalName",
    wildcardDisallowed = "wildcardDisallowed",
    wildcardRequired = "wildcardRequired"
}
export declare const consistentImport: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<object, Suboptions, "sources">, RuleListener>;
//# sourceMappingURL=consistent-import.d.ts.map