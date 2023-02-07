import { noGet } from "./no-get";
import { noSet } from "./no-set";
import { o } from "real-fns";
import { preferReflect } from "./prefer-reflect";
export const reflect = o.prefixKeys({ "no-get": noGet, "no-set": noSet, "prefer-reflect": preferReflect }, "reflect/");
//# sourceMappingURL=index.js.map