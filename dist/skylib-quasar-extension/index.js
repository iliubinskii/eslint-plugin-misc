"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skylibQuasarExtension = void 0;
const extras_1 = require("./extras");
const jest_1 = require("./jest");
const misc_1 = require("./misc");
const functions_1 = require("@skylib/functions");
const vue_1 = require("./vue");
exports.skylibQuasarExtension = {
    extras: functions_1.o.prefixKeys(extras_1.extras, "quasar-extension/"),
    jest: functions_1.o.prefixKeys(jest_1.jest, "quasar-extension/"),
    misc: functions_1.o.prefixKeys(misc_1.misc, "quasar-extension/"),
    vue: functions_1.o.prefixKeys(vue_1.vue, "quasar-extension/")
};
//# sourceMappingURL=index.js.map