import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const preferSort = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: 'Use "a.sort" instead (avoid mutation side-effects)',
      selector: ".callee[property.name=sort] > .object",
      typeHas: utils.TypeGroup.array
    }
  ]
});
