import * as utils from "../utils";
import { core } from "../core";

export const sortCommitlint = utils.wrapRule({
  rule: core["sort-array"],
  options: [{ triggerByComment: false }]
});
