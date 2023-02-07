import { core } from "./core";
import { extras } from "./extras";
import { jest } from "./jest";
import { o } from "real-fns";
import { vue } from "./vue";
export const quasarExtension = {
    core: o.prefixKeys(core, "quasar-extension/"),
    extras: o.prefixKeys(extras, "quasar-extension/"),
    jest: o.prefixKeys(jest, "quasar-extension/"),
    vue: o.prefixKeys(vue, "quasar-extension/")
};
//# sourceMappingURL=index.js.map