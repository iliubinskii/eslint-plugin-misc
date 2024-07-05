"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = get;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("lodash-commonjs-es"));
const typescript_misc_1 = require("typescript-misc");
/**
 * Creates selector.
 * @param options - Options.
 * @param defaultSelectors - Default selectors.
 * @returns Selector.
 */
function get(options, defaultSelectors) {
    const { excludeSelectors, includeSelectors, noDefaultSelectors } = options;
    defaultSelectors = noDefaultSelectors ? [] : defaultSelectors;
    const selectors = _.difference([...defaultSelectors, ...includeSelectors], excludeSelectors);
    typescript_misc_1.assert.toBeTrue(selectors.length > 0, "Expecting at least one selector");
    return selectors.join(", ");
}
//# sourceMappingURL=configurable-selector.js.map