import { evaluate, o } from "real-fns";
import { core } from "./core";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { quasarExtension } from "./quasar-extension";
import { realClasses } from "./real-classes";
import { realConfig } from "./real-config";
import { realFacades } from "./real-facades";
import { realFns } from "./real-fns";
import { realServiceProviders } from "./real-service-providers";
import { typeEssentials } from "./type-essentials";
import { typescript } from "./typescript";
import { vue } from "./vue";
export const configs = evaluate(() => {
    const result = {
        "core": {
            rules: Object.assign(Object.assign({}, rules(core)), { "misc/match-filename": "off", "misc/no-restricted-syntax": "off", "misc/require-syntax": "off", "misc/wrap": "off" })
        },
        "eslintrc": { rules: rules(eslintrc) },
        "jest": { rules: rules(jest) },
        "quasar-extension.core": { rules: rules(quasarExtension.core) },
        "quasar-extension.extras": {
            rules: Object.assign(Object.assign({}, rules(quasarExtension.extras)), { "misc/consistent-optional-props": "off", "misc/typescript/no-empty-interfaces": "off" })
        },
        "quasar-extension.jest": { rules: rules(quasarExtension.jest) },
        "quasar-extension.vue": {
            rules: Object.assign(Object.assign({}, rules(quasarExtension.vue)), { "misc/quasar-extension/vue/template/prefer-quasar-components": "off" })
        },
        "real-classes": { rules: rules(realClasses) },
        "real-config": { rules: rules(realConfig) },
        "real-facades": { rules: rules(realFacades) },
        "real-fns.core": { rules: rules(realFns.core) },
        "real-fns.jest": { rules: rules(realFns.jest) },
        "real-service-providers": { rules: rules(realServiceProviders) },
        "type-essentials": { rules: rules(typeEssentials) },
        "typescript": {
            rules: Object.assign(Object.assign({}, rules(typescript)), { "misc/typescript/no-restricted-syntax": "off" })
        },
        "vue": {
            rules: Object.assign(Object.assign({}, rules(vue)), { "misc/typescript/no-complex-declarator-type": "off", "misc/typescript/no-complex-return-type": "off" })
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
    return o.fromEntries(o.keys(source).map(key => [`misc/${key}`, "error"]));
}
//# sourceMappingURL=configs.js.map