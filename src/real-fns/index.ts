import { core } from "./core";
import { jest } from "./jest";
import { o } from "real-fns";

export const realFns = {
  core: o.prefixKeys(core, "real-fns/"),
  jest: o.prefixKeys(jest, "real-fns/")
} as const;
