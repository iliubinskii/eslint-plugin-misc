import { o } from "typescript-misc";
import { preferNumber } from "./prefer-number";
import { preferString } from "./prefer-string";
export const converters = o.prefixKeys({ "prefer-number": preferNumber, "prefer-string": preferString }, "converters/");
//# sourceMappingURL=index.js.map