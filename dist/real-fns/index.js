"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realFunctions = void 0;
const core_1 = require("./core");
const jest_1 = require("./jest");
const real_fns_1 = require("real-fns");
exports.realFunctions = {
    core: real_fns_1.o.prefixKeys(core_1.core, "real-fns/"),
    jest: real_fns_1.o.prefixKeys(jest_1.jest, "real-fns/")
};
//# sourceMappingURL=index.js.map