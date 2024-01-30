"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jest = void 0;
const real_fns_1 = require("real-fns");
const prefer_mockCallsToBe_1 = require("./prefer-mockCallsToBe");
exports.jest = real_fns_1.o.prefixKeys({ "prefer-mockCallsToBe": prefer_mockCallsToBe_1.preferMockCallsToBe }, "jest/");
//# sourceMappingURL=index.js.map