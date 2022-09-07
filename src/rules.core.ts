import { core } from "./core";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { quasarExtension } from "./quasar-extension";
import { realConfig } from "./real-config";
import { realFacades } from "./real-facades";
import { realFramework } from "./real-framework";
import { realFunctions } from "./real-fns";
import { typescript } from "./typescript";
import { vue } from "./vue";

export const rules = {
  ...core,
  ...eslintrc,
  ...jest,
  ...typescript,
  ...vue,
  ...realConfig,
  ...realFacades,
  ...realFramework,
  ...realFunctions.core,
  ...realFunctions.jest,
  ...quasarExtension.core,
  ...quasarExtension.extras,
  ...quasarExtension.jest,
  ...quasarExtension.vue
} as const;
