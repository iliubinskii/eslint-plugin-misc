import { evaluate, o } from "@skylib/functions";
import type { IndexedRecord } from "@skylib/functions";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { misc } from "./misc";
import { skylibConfig } from "./skylib-config";
import { skylibFacades } from "./skylib-facades";
import { skylibFramework } from "./skylib-framework";
import { skylibFunctions } from "./skylib-functions";
import { skylibQuasarExtension } from "./skylib-quasar-extension";
import { typescript } from "./typescript";
import { vue } from "./vue";

export const configs = evaluate((): IndexedRecord => {
  const result = {
    "eslintrc": { rules: rules(eslintrc) },
    "jest": { rules: rules(jest) },
    "misc": {
      rules: {
        ...rules(misc),
        "@skylib/match-filename": "off",
        "@skylib/no-restricted-syntax": "off",
        "@skylib/require-syntax": "off",
        "@skylib/wrap": "off"
      }
    },
    "skylib-config": { rules: rules(skylibConfig) },
    "skylib-facades": { rules: rules(skylibFacades) },
    "skylib-framework": { rules: rules(skylibFramework) },
    "skylib-functions.jest": { rules: rules(skylibFunctions.jest) },
    "skylib-functions.misc": { rules: rules(skylibFunctions.misc) },
    "skylib-quasar-extension.extras": {
      rules: {
        ...rules(skylibQuasarExtension.extras),
        "@skylib/typescript/no-empty-interfaces": "off"
      }
    },
    "skylib-quasar-extension.jest": {
      rules: rules(skylibQuasarExtension.jest)
    },
    "skylib-quasar-extension.misc": {
      rules: rules(skylibQuasarExtension.misc)
    },
    "skylib-quasar-extension.vue": { rules: rules(skylibQuasarExtension.vue) },
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
      ...result.misc,
      overrides: [
        { files: "!*.js", ...result.typescript },
        { files: "*.vue", ...result.vue },
        { files: "./tests/**", ...result.jest },
        { files: ".eslintrc.js", ...result.eslintrc }
      ]
    },
    "skylib-functions": {
      ...result["skylib-functions.misc"],
      overrides: [{ files: "./tests/**", ...result["skylib-functions.jest"] }]
    },
    "skylib-quasar-extension": {
      ...result["skylib-quasar-extension.misc"],
      overrides: [
        { files: "*.extras", ...result["skylib-quasar-extension.extras"] },
        { files: "*.vue", ...result["skylib-quasar-extension.vue"] },
        { files: "./tests/**", ...result["skylib-quasar-extension.jest"] }
      ]
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
