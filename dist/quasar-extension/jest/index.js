"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jest = void 0;
const real_fns_1 = require("real-fns");
const prefer_findQuasarComponent_1 = require("./prefer-findQuasarComponent");
const prefer_testComponents_1 = require("./prefer-testComponents");
exports.jest = real_fns_1.o.prefixKeys({
    "prefer-findQuasarComponent": prefer_findQuasarComponent_1.preferFindQuasarComponent,
    "prefer-testComponents": prefer_testComponents_1.preferTestComponents
}, "jest/");
//# sourceMappingURL=index.js.map