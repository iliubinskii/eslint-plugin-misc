import * as utils from "../../utils";
import type { RuleListener, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly lint: utils.Selector;
    readonly plugin: string;
    readonly rule: string;
    readonly skip: utils.Selector;
}
export declare enum MessageId {
    customMessage = "customMessage"
}
export declare const wrap: RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, object, never>, RuleListener>;
//# sourceMappingURL=wrap.d.ts.map