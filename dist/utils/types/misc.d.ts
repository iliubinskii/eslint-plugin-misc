import type { ReportDescriptor as BaseReportDescriptor, RuleFix, RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { Rec, a, strings } from "typescript-misc";
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
export type FilePattern = a.Mixed<string>;
export interface Matcher {
    /**
     * Checks if string matches condition.
     *
     * @param str - String.
     * @returns _True_ if string matches condition, _false_ otherwise.
     */
    (str: string): boolean;
}
export type Matchers = readonly Matcher[];
export type Options<O extends object, S extends object, K extends string = never> = O & {
    readonly [L in K]: SuboptionsArray<S>;
};
export type RegexpPattern = a.Mixed<string>;
export type ReportDescriptor<T extends string = string> = BaseReportDescriptor<T>;
export type ReportDescriptors<T extends string = string> = ReadonlyArray<ReportDescriptor<T>>;
export type RuleFixes = readonly RuleFix[];
export type RuleListeners = readonly RuleListener[];
export type Selector = a.Mixed<string>;
export interface SharedSuboptions {
    readonly filesToLint?: strings;
    readonly filesToSkip?: strings;
}
export type Suboptions<T extends object> = SharedSuboptions & T;
export type SuboptionsArray<T extends object> = ReadonlyArray<Suboptions<T>>;
export type TypeGroups = readonly TypeGroup[];
export type esRange = readonly [number, number];
export type esRanges = readonly esRange[];
//# sourceMappingURL=misc.d.ts.map