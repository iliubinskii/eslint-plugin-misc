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

export const rules = {
  ...core,
  ...eslintrc,
  ...jest,
  ...typescript,
  ...vue,
  ...skylibConfig,
  ...skylibFacades,
  ...skylibFramework,
  ...skylibFunctions.core,
  ...skylibFunctions.jest,
  ...skylibQuasarExtension.core,
  ...skylibQuasarExtension.extras,
  ...skylibQuasarExtension.jest,
  ...skylibQuasarExtension.vue
} as const;
