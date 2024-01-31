"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescriptMisc = void 0;
const functions_1 = require("./functions");
const jest_1 = require("./jest");
const typescript_misc_1 = require("typescript-misc");
const types_1 = require("./types");
exports.typescriptMisc = typescript_misc_1.o.prefixKeys({ ...functions_1.functions, ...jest_1.jest, ...types_1.types }, "typescript-misc/");
//# sourceMappingURL=index.js.map