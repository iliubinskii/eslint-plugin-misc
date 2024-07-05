"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = compare;
const tslib_1 = require("tslib");
const natural_compare_1 = tslib_1.__importDefault(require("natural-compare"));
/**
 * Compares two strings.
 * @param x - First value.
 * @param y - Second value.
 * @returns Comparison result.
 */
function compare(x, y) {
    return (0, natural_compare_1.default)(x, y);
}
//# sourceMappingURL=compare.js.map