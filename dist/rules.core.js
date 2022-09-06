"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const core_1 = require("./core");
const eslintrc_1 = require("./eslintrc");
const jest_1 = require("./jest");
const real_config_1 = require("./real-config");
const real_facades_1 = require("./real-facades");
const real_framework_1 = require("./real-framework");
const real_fns_1 = require("./real-fns");
const quasar_extension_1 = require("./quasar-extension");
const typescript_1 = require("./typescript");
const vue_1 = require("./vue");
exports.rules = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, core_1.core), eslintrc_1.eslintrc), jest_1.jest), typescript_1.typescript), vue_1.vue), real_config_1.skylibConfig), real_facades_1.skylibFacades), real_framework_1.skylibFramework), real_fns_1.skylibFunctions.core), real_fns_1.skylibFunctions.jest), quasar_extension_1.skylibQuasarExtension.core), quasar_extension_1.skylibQuasarExtension.extras), quasar_extension_1.skylibQuasarExtension.jest), quasar_extension_1.skylibQuasarExtension.vue);
//# sourceMappingURL=rules.core.js.map