"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vue = void 0;
const real_fns_1 = require("real-fns");
const script_1 = require("./script");
const template_1 = require("./template");
exports.vue = real_fns_1.o.prefixKeys(Object.assign(Object.assign({}, script_1.script), template_1.template), "vue/");
//# sourceMappingURL=index.js.map