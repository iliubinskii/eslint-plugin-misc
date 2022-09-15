"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const real_fns_1 = require("real-fns");
const core_1 = require("./core");
const eslintrc_1 = require("./eslintrc");
const jest_1 = require("./jest");
const quasar_extension_1 = require("./quasar-extension");
const real_config_1 = require("./real-config");
const real_facades_1 = require("./real-facades");
const real_framework_1 = require("./real-framework");
const real_fns_2 = require("./real-fns");
const typescript_1 = require("./typescript");
const vue_1 = require("./vue");
exports.configs = (0, real_fns_1.evaluate)(() => {
    const result = {
        "core": {
            rules: Object.assign(Object.assign({}, rules(core_1.core)), { "misc/match-filename": "off", "misc/no-restricted-syntax": "off", "misc/require-syntax": "off", "misc/wrap": "off" })
        },
        "eslintrc": { rules: rules(eslintrc_1.eslintrc) },
        "jest": { rules: rules(jest_1.jest) },
        "quasar-extension.core": { rules: rules(quasar_extension_1.quasarExtension.core) },
        "quasar-extension.extras": {
            rules: Object.assign(Object.assign({}, rules(quasar_extension_1.quasarExtension.extras)), { "misc/typescript/consistent-optional-props": "off", "misc/typescript/no-empty-interfaces": "off" })
        },
        "quasar-extension.jest": { rules: rules(quasar_extension_1.quasarExtension.jest) },
        "quasar-extension.vue": { rules: rules(quasar_extension_1.quasarExtension.vue) },
        "real-config": { rules: rules(real_config_1.realConfig) },
        "real-facades": { rules: rules(real_facades_1.realFacades) },
        "real-fns.core": { rules: rules(real_fns_2.realFunctions.core) },
        "real-fns.jest": { rules: rules(real_fns_2.realFunctions.jest) },
        "real-framework": { rules: rules(real_framework_1.realFramework) },
        "typescript": {
            rules: Object.assign(Object.assign({}, rules(typescript_1.typescript)), { "misc/typescript/no-restricted-syntax": "off" })
        },
        "vue": {
            rules: Object.assign(Object.assign({}, rules(vue_1.vue)), { "misc/typescript/no-complex-declarator-type": "off", "misc/typescript/no-complex-return-type": "off" })
        }
    };
    return Object.assign(Object.assign({}, result), { "all": Object.assign(Object.assign({}, result.core), { overrides: [
                Object.assign({ files: "!*.js" }, result.typescript),
                Object.assign({ files: "*.vue" }, result.vue),
                Object.assign({ files: "./tests/**" }, result.jest),
                Object.assign({ files: ".eslintrc.js" }, result.eslintrc)
            ] }), "quasar-extension": Object.assign(Object.assign({}, result["quasar-extension.core"]), { overrides: [
                Object.assign({ files: "*.extras.ts" }, result["quasar-extension.extras"]),
                Object.assign({ files: "*.vue" }, result["quasar-extension.vue"]),
                Object.assign({ files: "./tests/**" }, result["quasar-extension.jest"])
            ] }), "real-fns": Object.assign(Object.assign({}, result["real-fns.core"]), { overrides: [Object.assign({ files: "./tests/**" }, result["real-fns.jest"])] }) });
});
/**
 * Converts rules to configuration.
 *
 * @param source - Rules.
 * @returns Configuration.
 */
function rules(source) {
    return real_fns_1.o.fromEntries(real_fns_1.o.keys(source).map(key => [`misc/${key}`, "error"]));
}
//# sourceMappingURL=configs.js.map