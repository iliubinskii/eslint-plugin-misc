import { o } from "real-fns";
import { script } from "./script";
import { template } from "./template";

export const vue = o.prefixKeys({ ...script, ...template }, "vue/");
