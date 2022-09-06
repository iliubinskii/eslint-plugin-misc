"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash-commonjs-es"));
const real_fns_1 = require("real-fns");
/**
 * Creates selector.
 *
 * @param options - Options.
 * @param defaultSelectors - Default selectors.
 * @returns Selector.
 */
function get(options, defaultSelectors) {
    const { excludeSelectors, includeSelectors, noDefaultSelectors } = options;
    defaultSelectors = noDefaultSelectors ? [] : defaultSelectors;
    const selectors = _.difference([...defaultSelectors, ...includeSelectors], excludeSelectors);
    real_fns_1.assert.toBeTrue(selectors.length > 0, "Expecting at least one selector");
    return selectors.join(", ");
}
exports.get = get;
//# sourceMappingURL=configurable-selector.js.map