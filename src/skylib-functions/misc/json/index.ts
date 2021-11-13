import { o } from "@skylib/functions";
import { preferJson } from "./prefer-json";

export const json = o.prefixKeys({ "prefer-json": preferJson }, "json/");
