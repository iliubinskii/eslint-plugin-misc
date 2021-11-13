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

export const rules = {
  ...misc,
  ...eslintrc,
  ...jest,
  ...typescript,
  ...vue,
  ...skylibConfig,
  ...skylibFacades,
  ...skylibFramework,
  ...skylibFunctions.jest,
  ...skylibFunctions.misc,
  ...skylibQuasarExtension.extras,
  ...skylibQuasarExtension.jest,
  ...skylibQuasarExtension.misc,
  ...skylibQuasarExtension.vue
} as const;
