import { jest } from "./jest";
import { misc } from "./misc";
import { o } from "@skylib/functions";

export const skylibFunctions = {
  jest: o.prefixKeys(jest, "functions/"),
  misc: o.prefixKeys(misc, "functions/")
} as const;
