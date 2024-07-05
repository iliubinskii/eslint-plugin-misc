import * as utils from "../../utils";
import type { RuleListener, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
export declare enum MessageId {
    customMessage = "customMessage"
}
export declare const wrap: RuleModule<MessageId, import("../../utils/create-rule").PartialOptionsArray<Options, object, never>, RuleListener>;
export interface Options {
    readonly disableFix: boolean;
    readonly lint: utils.Selector;
    readonly plugin: string;
    readonly rule: string;
    readonly skip: utils.Selector;
}
//# sourceMappingURL=wrap.d.ts.map