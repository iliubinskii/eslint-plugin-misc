"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tsMisc = void 0;
const functions_1 = require("./functions");
const jest_1 = require("./jest");
const real_fns_1 = require("real-fns");
const types_1 = require("./types");
exports.tsMisc = real_fns_1.o.prefixKeys(Object.assign(Object.assign(Object.assign({}, functions_1.functions), jest_1.jest), types_1.types), "ts-misc/");
//# sourceMappingURL=index.js.map