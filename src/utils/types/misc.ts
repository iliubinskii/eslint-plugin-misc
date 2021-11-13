import type {
  ReportDescriptor as BaseReportDescriptor,
  RuleFix,
  RuleListener
} from "@typescript-eslint/utils/dist/ts-eslint";
import type { Rec, strings } from "@skylib/functions";

export enum Casing {
  camelCase = "camelCase",
  // eslint-disable-next-line @skylib/consistent-enum-members -- Ok
  kebabCase = "kebab-case",
  // eslint-disable-next-line @skylib/consistent-enum-members -- Ok
  pascalCase = "PascalCase"
}

export enum Fixable {
  code = "code",
  whitespace = "whitespace"
}

export enum TypeGroup {
  any = "any",
  array = "array",
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
  // eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
  // fixme
  readonly allow: strings | string;
  readonly disallow: strings | string;
}

export interface Docs<
  O extends PropertyKey = never,
  S extends PropertyKey = never
> {
  readonly description: string;
  readonly failExamples: string;
  readonly optionDescriptions?: Rec<O, string>;
  readonly optionTypes?: Rec<O, string>;
  readonly passExamples: string;
  readonly suboptionDescriptions?: Rec<S, string>;
  readonly suboptionTypes?: Rec<S, string>;
}

// eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
// fixme
export type FilePattern = AllowDisallowPatterns | strings | string;

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

export type Options<
  O extends object,
  S extends object,
  K extends string = never
> = O & { readonly [L in K]: SuboptionsArray<S> };

// eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
// fixme
export type RegexpPattern = strings | string;

export type ReportDescriptor<T extends string = string> =
  BaseReportDescriptor<T>;

export type ReportDescriptors<T extends string = string> = ReadonlyArray<
  ReportDescriptor<T>
>;

export type RuleFixes = readonly RuleFix[];

export type RuleListeners = readonly RuleListener[];

// eslint-disable-next-line no-warning-comments -- Wait for @skylib/functions update
// fixme
export type Selector = strings | string;

export interface SharedSuboptions {
  readonly filesToLint?: strings;
  readonly filesToSkip?: strings;
}

export type Suboptions<T extends object> = SharedSuboptions & T;

export type SuboptionsArray<T extends object> = ReadonlyArray<Suboptions<T>>;

export type TypeGroups = readonly TypeGroup[];

export type esRange = readonly [number, number];

export type esRanges = readonly esRange[];
