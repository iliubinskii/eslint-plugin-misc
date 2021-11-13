"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converters = void 0;
const functions_1 = require("@skylib/functions");
const prefer_number_1 = require("./prefer-number");
const prefer_string_1 = require("./prefer-string");
exports.converters = functions_1.o.prefixKeys({ "prefer-number": prefer_number_1.preferNumber, "prefer-string": prefer_string_1.preferString }, "converters/");
//# sourceMappingURL=index.js.map