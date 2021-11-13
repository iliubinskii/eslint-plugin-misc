"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skylibFunctions = void 0;
const jest_1 = require("./jest");
const misc_1 = require("./misc");
const functions_1 = require("@skylib/functions");
exports.skylibFunctions = {
    jest: functions_1.o.prefixKeys(jest_1.jest, "functions/"),
    misc: functions_1.o.prefixKeys(misc_1.misc, "functions/")
};
//# sourceMappingURL=index.js.map