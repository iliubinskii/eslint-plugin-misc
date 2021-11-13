"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const eslintrc_1 = require("./eslintrc");
const jest_1 = require("./jest");
const misc_1 = require("./misc");
const skylib_config_1 = require("./skylib-config");
const skylib_facades_1 = require("./skylib-facades");
const skylib_framework_1 = require("./skylib-framework");
const skylib_functions_1 = require("./skylib-functions");
const skylib_quasar_extension_1 = require("./skylib-quasar-extension");
const typescript_1 = require("./typescript");
const vue_1 = require("./vue");
exports.rules = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, misc_1.misc), eslintrc_1.eslintrc), jest_1.jest), typescript_1.typescript), vue_1.vue), skylib_config_1.skylibConfig), skylib_facades_1.skylibFacades), skylib_framework_1.skylibFramework), skylib_functions_1.skylibFunctions.jest), skylib_functions_1.skylibFunctions.misc), skylib_quasar_extension_1.skylibQuasarExtension.extras), skylib_quasar_extension_1.skylibQuasarExtension.jest), skylib_quasar_extension_1.skylibQuasarExtension.misc), skylib_quasar_extension_1.skylibQuasarExtension.vue);
//# sourceMappingURL=rules.core.js.map