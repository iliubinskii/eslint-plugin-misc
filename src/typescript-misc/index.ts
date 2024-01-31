import { functions } from "./functions";
import { jest } from "./jest";
import { o } from "real-fns";
import { types } from "./types";

export const typescriptMisc = o.prefixKeys(
  { ...functions, ...jest, ...types },
  "typescript-misc/"
);
