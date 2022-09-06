import { evaluate, o } from "real-fns";
import type { IndexedRecord } from "real-fns";
import { core } from "./core";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { skylibConfig } from "./real-config";
import { skylibFacades } from "./real-facades";
import { skylibFramework } from "./real-framework";
import { skylibFunctions } from "./real-fns";
import { skylibQuasarExtension } from "./quasar-extension";
import { typescript } from "./typescript";
import { vue } from "./vue";

export const configs = evaluate((): IndexedRecord => {
  const result = {
    "core": {
      rules: {
        ...rules(core),
        "@skylib/match-filename": "off",
        "@skylib/no-restricted-syntax": "off",
        "@skylib/require-syntax": "off",
        "@skylib/wrap": "off"
      }
    },
    "eslintrc": { rules: rules(eslintrc) },
    "jest": { rules: rules(jest) },
    "quasar-extension.core": { rules: rules(skylibQuasarExtension.core) },
    "quasar-extension.extras": {
      rules: {
        ...rules(skylibQuasarExtension.extras),
        "@skylib/typescript/no-empty-interfaces": "off"
      }
    },
    "quasar-extension.jest": { rules: rules(skylibQuasarExtension.jest) },
    "quasar-extension.vue": { rules: rules(skylibQuasarExtension.vue) },
    "real-config": { rules: rules(skylibConfig) },
    "real-facades": { rules: rules(skylibFacades) },
    "real-fns.core": { rules: rules(skylibFunctions.core) },
    "real-fns.jest": { rules: rules(skylibFunctions.jest) },
    "real-framework": { rules: rules(skylibFramework) },
    "typescript": {
      rules: {
        ...rules(typescript),
        "@skylib/typescript/no-restricted-syntax": "off"
      }
    },
    "vue": {
      rules: {
        ...rules(vue),
        "@skylib/typescript/no-complex-declarator-type": "off",
        "@skylib/typescript/no-complex-return-type": "off"
      }
    }
  } as const;

  return {
    ...result,
    "all": {
      ...result.core,
      overrides: [
        { files: "!*.js", ...result.typescript },
        { files: "*.vue", ...result.vue },
        { files: "./tests/**", ...result.jest },
        { files: ".eslintrc.js", ...result.eslintrc }
      ]
    },
    "quasar-extension": {
      ...result["quasar-extension.core"],
      overrides: [
        { files: "*.extras", ...result["quasar-extension.extras"] },
        { files: "*.vue", ...result["quasar-extension.vue"] },
        { files: "./tests/**", ...result["quasar-extension.jest"] }
      ]
    },
    "real-fns": {
      ...result["real-fns.core"],
      overrides: [{ files: "./tests/**", ...result["real-fns.jest"] }]
    }
  };
});

/**
 * Converts rules to configuration.
 *
 * @param source - Rules.
 * @returns Configuration.
 */
function rules(source: IndexedRecord): object {
  return o.fromEntries(o.keys(source).map(key => [`@skylib/${key}`, "warn"]));
}
