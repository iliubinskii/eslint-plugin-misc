import { eslintrc } from "./eslintrc";
import { o } from "real-fns";
import { sortCommitlint } from "./sort-commitlint";
export const projectChore = o.prefixKeys(Object.assign({ "sort-commitlint": sortCommitlint }, eslintrc), "project-chore/");
//# sourceMappingURL=index.js.map