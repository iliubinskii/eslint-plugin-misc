import { o } from "real-fns";
import { preferJson } from "./prefer-json";

export const json = o.prefixKeys({ "prefer-json": preferJson }, "json/");
