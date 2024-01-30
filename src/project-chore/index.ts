import { eslintrc } from "./eslintrc";
import { o } from "real-fns";
import { sortCommitlint } from "./sort-commitlint";

export const projectChore = o.prefixKeys(
  { "sort-commitlint": sortCommitlint, ...eslintrc },
  "project-chore/"
);
