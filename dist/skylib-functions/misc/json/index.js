"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = void 0;
const functions_1 = require("@skylib/functions");
const prefer_json_1 = require("./prefer-json");
exports.json = functions_1.o.prefixKeys({ "prefer-json": prefer_json_1.preferJson }, "json/");
//# sourceMappingURL=index.js.map