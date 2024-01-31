import { eslintrc } from "./eslintrc";
import { o } from "typescript-misc";
import { sortCommitlint } from "./sort-commitlint";
export const projectChore = o.prefixKeys({ "sort-commitlint": sortCommitlint, ...eslintrc }, "project-chore/");
//# sourceMappingURL=index.js.map