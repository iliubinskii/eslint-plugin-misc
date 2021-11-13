"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const functions_1 = require("@skylib/functions");
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
exports.configs = (0, functions_1.evaluate)(() => {
    const result = {
        "eslintrc": { rules: rules(eslintrc_1.eslintrc) },
        "jest": { rules: rules(jest_1.jest) },
        "misc": {
            rules: Object.assign(Object.assign({}, rules(misc_1.misc)), { "@skylib/match-filename": "off", "@skylib/no-restricted-syntax": "off", "@skylib/require-syntax": "off", "@skylib/wrap": "off" })
        },
        "skylib-config": { rules: rules(skylib_config_1.skylibConfig) },
        "skylib-facades": { rules: rules(skylib_facades_1.skylibFacades) },
        "skylib-framework": { rules: rules(skylib_framework_1.skylibFramework) },
        "skylib-functions.jest": { rules: rules(skylib_functions_1.skylibFunctions.jest) },
        "skylib-functions.misc": { rules: rules(skylib_functions_1.skylibFunctions.misc) },
        "skylib-quasar-extension.extras": {
            rules: Object.assign(Object.assign({}, rules(skylib_quasar_extension_1.skylibQuasarExtension.extras)), { "@skylib/typescript/no-empty-interfaces": "off" })
        },
        "skylib-quasar-extension.jest": {
            rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.jest)
        },
        "skylib-quasar-extension.misc": {
            rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.misc)
        },
        "skylib-quasar-extension.vue": { rules: rules(skylib_quasar_extension_1.skylibQuasarExtension.vue) },
        "typescript": {
            rules: Object.assign(Object.assign({}, rules(typescript_1.typescript)), { "@skylib/typescript/no-restricted-syntax": "off" })
        },
        "vue": {
            rules: Object.assign(Object.assign({}, rules(vue_1.vue)), { "@skylib/typescript/no-complex-declarator-type": "off", "@skylib/typescript/no-complex-return-type": "off" })
        }
    };
    return Object.assign(Object.assign({}, result), { "all": Object.assign(Object.assign({}, result.misc), { overrides: [
                Object.assign({ files: "!*.js" }, result.typescript),
                Object.assign({ files: "*.vue" }, result.vue),
                Object.assign({ files: "./tests/**" }, result.jest),
                Object.assign({ files: ".eslintrc.js" }, result.eslintrc)
            ] }), "skylib-functions": Object.assign(Object.assign({}, result["skylib-functions.misc"]), { overrides: [Object.assign({ files: "./tests/**" }, result["skylib-functions.jest"])] }), "skylib-quasar-extension": Object.assign(Object.assign({}, result["skylib-quasar-extension.misc"]), { overrides: [
                Object.assign({ files: "*.extras" }, result["skylib-quasar-extension.extras"]),
                Object.assign({ files: "*.vue" }, result["skylib-quasar-extension.vue"]),
                Object.assign({ files: "./tests/**" }, result["skylib-quasar-extension.jest"])
            ] }) });
});
/**
 * Converts rules to configuration.
 *
 * @param source - Rules.
 * @returns Configuration.
 */
function rules(source) {
    return functions_1.o.fromEntries(functions_1.o.keys(source).map(key => [`@skylib/${key}`, "warn"]));
}
//# sourceMappingURL=configs.js.map