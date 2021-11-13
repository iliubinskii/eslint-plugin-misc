import { fn, is } from "@skylib/functions";
import type { FilePattern, Matcher, RegexpPattern, RuleListeners, Selector } from "./types";
import { Casing, TypeGroup } from "./types";
import type { TSESTree } from "@typescript-eslint/utils";
import type { unknowns } from "@skylib/functions";
import type { RuleListener, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
import type { WrapRuleOptions } from "./misc.internal";
import minimatch from "minimatch";
export declare const isCasing: is.Guard<Casing>;
export declare const isStringOrStrings: is.Guard<string | readonly string[]>;
export declare const isFilePattern: is.Guard<FilePattern>;
export declare const isRegexpPattern: is.Guard<RegexpPattern>;
export declare const isSelector: is.Guard<Selector>;
export declare const isTypeGroup: is.Guard<TypeGroup>;
export declare const isTypeGroups: is.Guard<readonly TypeGroup[]>;
export declare const projectRoot: string;
/**
 * Creates file matcher.
 *
 * @param pattern - Pattern.
 * @param defVal - Default value.
 * @param options - Minimatch options.
 * @returns Matcher.
 */
export declare function createFileMatcher(pattern: FilePattern, defVal: boolean, options: Readonly<minimatch.IOptions>): Matcher;
/**
 * Creates matcher.
 *
 * @param pattern - RegExp pattern(s).
 * @param defVal - Default value.
 * @returns Matcher.
 */
export declare function createRegexpMatcher(pattern: RegexpPattern, defVal: boolean): Matcher;
/**
 * Merges listeners.
 *
 * @param listeners - Listeners.
 * @returns Merged listeners.
 */
export declare function mergeListeners(...listeners: RuleListeners): RuleListener;
/**
 * Returns string representing node.
 *
 * @param node - Node.
 * @param defVal - Default value.
 * @returns String representing node.
 */
export declare function nodeText(node: TSESTree.Node, defVal: fn.ValueGenerator<string> | string): string;
/**
 * Assemles selector.
 *
 * @param raw - Raw selector.
 * @returns Selector.
 */
export declare function selector(raw: Selector): string;
/**
 * Sets casing.
 *
 * @param str - String.
 * @param casing - Casing.
 * @returns Formatted string.
 */
export declare function setCasing(str: string, casing?: Casing): string;
/**
 * Wraps third-party rule.
 *
 * @param options - Options.
 * @returns Wrapped rule.
 */
export declare function wrapRule<M extends string, O extends unknowns>(options: WrapRuleOptions<M, O>): RuleModule<M, O>;
//# sourceMappingURL=misc.d.ts.map