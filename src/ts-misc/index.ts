import { functions } from "./functions";
import { jest } from "./jest";
import { o } from "real-fns";
import { types } from "./types";

export const tsMisc = o.prefixKeys(
  { ...functions, ...jest, ...types },
  "ts-misc/"
);
