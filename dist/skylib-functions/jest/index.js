"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jest = void 0;
const functions_1 = require("@skylib/functions");
const prefer_mockCallsToBe_1 = require("./prefer-mockCallsToBe");
exports.jest = functions_1.o.prefixKeys({ "prefer-mockCallsToBe": prefer_mockCallsToBe_1.preferMockCallsToBe }, "jest/");
//# sourceMappingURL=index.js.map