import { eslintrc } from "./eslintrc";
import { o } from "real-fns";
import { prettier } from "./prettier";
import { sortCommitlint } from "./sort-commitlint";

export const skylibConfig = o.prefixKeys(
  { prettier, "sort-commitlint": sortCommitlint, ...eslintrc },
  "config/"
);
