import * as utils from "../utils";
import { misc } from "../misc";

export const sortCommitlint = utils.wrapRule({
  rule: misc["sort-array"],
  options: [{ triggerByComment: false }]
});
