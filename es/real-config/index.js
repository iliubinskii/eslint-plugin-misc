import { eslintrc } from "./eslintrc";
import { o } from "real-fns";
import { sortCommitlint } from "./sort-commitlint";
export const realConfig = o.prefixKeys(Object.assign({ "sort-commitlint": sortCommitlint }, eslintrc), "real-config/");
//# sourceMappingURL=index.js.map