import * as _ from "lodash-commonjs-es";
import { assert } from "real-fns";
import type { strings } from "real-fns";

/**
 * Creates selector.
 *
 * @param options - Options.
 * @param defaultSelectors - Default selectors.
 * @returns Selector.
 */
export function get(options: Options, defaultSelectors: strings): string {
  const { excludeSelectors, includeSelectors, noDefaultSelectors } = options;

  defaultSelectors = noDefaultSelectors ? [] : defaultSelectors;

  const selectors = _.difference(
    [...defaultSelectors, ...includeSelectors],
    excludeSelectors
  );

  assert.toBeTrue(selectors.length > 0, "Expecting at least one selector");

  return selectors.join(", ");
}

export interface Options {
  readonly excludeSelectors: strings;
  readonly includeSelectors: strings;
  readonly noDefaultSelectors: boolean;
}
