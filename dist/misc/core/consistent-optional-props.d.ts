import * as utils from "../../utils";
import { is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly classes: Style;
    readonly interfaces: Style;
}
export interface Suboptions {
    readonly _id: string;
    readonly pattern: utils.RegexpPattern;
    readonly propertyPattern: utils.RegexpPattern;
    readonly style: Style;
    readonly target?: Target;
}
export declare enum MessageId {
    combined = "combined",
    combinedId = "combinedId",
    optional = "optional",
    optionalId = "optionalId",
    undefined = "undefined",
    undefinedId = "undefinedId"
}
export declare enum Style {
    combined = "combined",
    optional = "optional",
    undefined = "undefined"
}
export declare enum Target {
    classes = "classes",
    interfaces = "interfaces"
}
export declare const isStyle: is.Guard<Style>;
export declare const isTarget: is.Guard<Target>;
export declare const consistentOptionalProps: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, Suboptions, "overrides">, RuleListener>;
//# sourceMappingURL=consistent-optional-props.d.ts.map