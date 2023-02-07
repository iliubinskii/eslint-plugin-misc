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
export const rules = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, core), eslintrc), jest), quasarExtension.core), quasarExtension.extras), quasarExtension.jest), quasarExtension.vue), realClasses), realConfig), realFacades), realFns.core), realFns.jest), realServiceProviders), typeEssentials), typescript), vue);
//# sourceMappingURL=rules.core.js.map