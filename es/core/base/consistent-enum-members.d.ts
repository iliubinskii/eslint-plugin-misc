import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Suboptions {
    readonly _id: string;
    readonly format: utils.Casing;
    readonly selector: utils.Selector;
}
export declare enum MessageId {
    inconsistentMember = "inconsistentMember"
}
export declare const consistentEnumMembers: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<object, Suboptions, "overrides">, RuleListener>;
//# sourceMappingURL=consistent-enum-members.d.ts.map