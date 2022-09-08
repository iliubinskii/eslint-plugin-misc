"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quasarExtension = void 0;
const core_1 = require("./core");
const extras_1 = require("./extras");
const jest_1 = require("./jest");
const real_fns_1 = require("real-fns");
const vue_1 = require("./vue");
exports.quasarExtension = {
    core: real_fns_1.o.prefixKeys(core_1.core, "quasar-extension/"),
    extras: real_fns_1.o.prefixKeys(extras_1.extras, "quasar-extension/"),
    jest: real_fns_1.o.prefixKeys(jest_1.jest, "quasar-extension/"),
    vue: real_fns_1.o.prefixKeys(vue_1.vue, "quasar-extension/")
};
//# sourceMappingURL=index.js.map