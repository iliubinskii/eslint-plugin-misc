import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { strings } from "typescript-misc";
export interface Options {
    readonly sortingOrder: strings;
}
export declare const sortClassMembers: import("@typescript-eslint/utils/dist/ts-eslint").RuleModule<import("../../utils/sort").MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=sort-class-members.d.ts.map