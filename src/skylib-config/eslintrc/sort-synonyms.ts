import * as utils from "../../utils";
import { misc } from "../../misc";

export const sortSynonyms = utils.wrapRule({
  rule: misc["sort-array"],
  options: [{ triggerByComment: false }]
});
