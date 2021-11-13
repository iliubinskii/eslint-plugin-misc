import { extras } from "./extras";
import { jest } from "./jest";
import { misc } from "./misc";
import { o } from "@skylib/functions";
import { vue } from "./vue";

export const skylibQuasarExtension = {
  extras: o.prefixKeys(extras, "quasar-extension/"),
  jest: o.prefixKeys(jest, "quasar-extension/"),
  misc: o.prefixKeys(misc, "quasar-extension/"),
  vue: o.prefixKeys(vue, "quasar-extension/")
} as const;
