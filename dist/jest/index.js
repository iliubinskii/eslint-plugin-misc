"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jest = void 0;
const no_toThrow_literal_1 = require("./no-toThrow-literal");
const real_fns_1 = require("real-fns");
const prefer_toBe_1 = require("./prefer-toBe");
const prefer_toStrictEqual_1 = require("./prefer-toStrictEqual");
exports.jest = real_fns_1.o.prefixKeys({
    "no-toThrow-literal": no_toThrow_literal_1.noToThrowLiteral,
    "prefer-toBe": prefer_toBe_1.preferToBe,
    "prefer-toStrictEqual": prefer_toStrictEqual_1.preferToStrictEqual
}, "jest/");
//# sourceMappingURL=index.js.map