import type { strings } from "@skylib/functions";
export interface Options {
    readonly excludeSelectors: strings;
    readonly includeSelectors: strings;
    readonly noDefaultSelectors: boolean;
}
/**
 * Creates selector.
 *
 * @param options - Options.
 * @param defaultSelectors - Default selectors.
 * @returns Selector.
 */
export declare function get(options: Options, defaultSelectors: strings): string;
//# sourceMappingURL=configurable-selector.d.ts.map