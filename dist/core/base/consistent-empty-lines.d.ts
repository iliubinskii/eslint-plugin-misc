import * as utils from "../../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Suboptions {
    readonly _id: string;
    readonly emptyLine: EmptyLine;
    readonly next?: utils.Selector;
    readonly prev?: utils.Selector;
    readonly selector?: utils.Selector;
}
export declare enum EmptyLine {
    always = "always",
    any = "any",
    never = "never"
}
export declare enum MessageId {
    addEmptyLine = "addEmptyLine",
    removeEmptyLine = "removeEmptyLine"
}
export declare const consistentEmptyLines: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<object, Suboptions, "rules">, RuleListener>;
//# sourceMappingURL=consistent-empty-lines.d.ts.map