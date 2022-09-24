import { eslintrc } from "./eslintrc";
import { o } from "real-fns";
import { sortCommitlint } from "./sort-commitlint";

export const realConfig = o.prefixKeys(
  { "sort-commitlint": sortCommitlint, ...eslintrc },
  "real-config/"
);
