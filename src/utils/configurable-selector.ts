import * as _ from "@skylib/lodash-commonjs-es";
import { assert } from "@skylib/functions";
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
