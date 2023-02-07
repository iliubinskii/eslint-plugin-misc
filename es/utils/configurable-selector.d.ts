import type { strings } from "type-essentials";
/**
 * Creates selector.
 *
 * @param options - Options.
 * @param defaultSelectors - Default selectors.
 * @returns Selector.
 */
export declare function get(options: Options, defaultSelectors: strings): string;
export interface Options {
    readonly excludeSelectors: strings;
    readonly includeSelectors: strings;
    readonly noDefaultSelectors: boolean;
}
//# sourceMappingURL=configurable-selector.d.ts.map