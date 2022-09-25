import type { ReportDescriptor as BaseReportDescriptor, RuleFix, RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { Rec, strings } from "type-essentials";
import type { a } from "real-fns";
export declare enum Casing {
    camelCase = "camelCase",
    kebabCase = "kebab-case",
    pascalCase = "PascalCase"
}
export declare enum Fixable {
    code = "code",
    whitespace = "whitespace"
}
export declare enum TypeGroup {
    any = "any",
    array = "array",
    arrayOrTuple = "arrayOrTuple",
    boolean = "boolean",
    complex = "complex",
    function = "function",
    never = "never",
    null = "null",
    number = "number",
    object = "object",
    parameter = "parameter",
    readonly = "readonly",
    string = "string",
    symbol = "symbol",
    tuple = "tuple",
    undefined = "undefined",
    unknown = "unknown"
}
export interface AllowDisallowPatterns {
    readonly allow: a.Mixed<string>;
    readonly disallow: a.Mixed<string>;
}
export interface Docs<O extends PropertyKey = never, S extends PropertyKey = never> {
    readonly description: string;
    readonly failExamples: string;
    readonly optionDescriptions?: Rec<O, string>;
    readonly optionTypes?: Rec<O, string>;
    readonly passExamples: string;
    readonly suboptionDescriptions?: Rec<S, string>;
    readonly suboptionTypes?: Rec<S, string>;
}
export declare type FilePattern = a.Mixed<string>;
export interface Matcher {
    /**
     * Checks if string matches condition.
     *
     * @param str - String.
     * @returns _True_ if string matches condition, _false_ otherwise.
     */
    (str: string): boolean;
}
export declare type Matchers = readonly Matcher[];
export declare type Options<O extends object, S extends object, K extends string = never> = O & {
    readonly [L in K]: SuboptionsArray<S>;
};
export declare type RegexpPattern = a.Mixed<string>;
export declare type ReportDescriptor<T extends string = string> = BaseReportDescriptor<T>;
export declare type ReportDescriptors<T extends string = string> = ReadonlyArray<ReportDescriptor<T>>;
export declare type RuleFixes = readonly RuleFix[];
export declare type RuleListeners = readonly RuleListener[];
export declare type Selector = a.Mixed<string>;
export interface SharedSuboptions {
    readonly filesToLint?: strings;
    readonly filesToSkip?: strings;
}
export declare type Suboptions<T extends object> = SharedSuboptions & T;
export declare type SuboptionsArray<T extends object> = ReadonlyArray<Suboptions<T>>;
export declare type TypeGroups = readonly TypeGroup[];
export declare type esRange = readonly [number, number];
export declare type esRanges = readonly esRange[];
//# sourceMappingURL=misc.d.ts.map