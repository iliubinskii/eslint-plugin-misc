"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rules = void 0;
const core_1 = require("./core");
const eslintrc_1 = require("./eslintrc");
const jest_1 = require("./jest");
const quasar_extension_1 = require("./quasar-extension");
const real_classes_1 = require("./real-classes");
const real_config_1 = require("./real-config");
const real_facades_1 = require("./real-facades");
const real_fns_1 = require("./real-fns");
const real_service_providers_1 = require("./real-service-providers");
const type_essentials_1 = require("./type-essentials");
const typescript_1 = require("./typescript");
const vue_1 = require("./vue");
exports.rules = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, core_1.core), eslintrc_1.eslintrc), jest_1.jest), quasar_extension_1.quasarExtension.core), quasar_extension_1.quasarExtension.extras), quasar_extension_1.quasarExtension.jest), quasar_extension_1.quasarExtension.vue), real_classes_1.realClasses), real_config_1.realConfig), real_facades_1.realFacades), real_fns_1.realFns.core), real_fns_1.realFns.jest), real_service_providers_1.realServiceProviders), type_essentials_1.typeEssentials), typescript_1.typescript), vue_1.vue);
//# sourceMappingURL=rules.core.js.map