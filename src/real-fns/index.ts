import { core } from "./core";
import { jest } from "./jest";
import { o } from "real-fns";

export const skylibFunctions = {
  core: o.prefixKeys(core, "functions/"),
  jest: o.prefixKeys(jest, "functions/")
} as const;
