import { o } from "typescript-misc";
import { preferJson } from "./prefer-json";

export const json = o.prefixKeys({ "prefer-json": preferJson }, "json/");
