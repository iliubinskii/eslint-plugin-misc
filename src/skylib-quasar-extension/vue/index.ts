import { o } from "@skylib/functions";
import { script } from "./script";
import { template } from "./template";

export const vue = o.prefixKeys({ ...script, ...template }, "vue/");
