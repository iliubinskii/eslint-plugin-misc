import * as utils from "../../../utils";
import { typescript } from "../../../typescript";

export const preferReverse = utils.wrapRule({
  rule: typescript["typescript/no-restricted-syntax"],
  options: [
    {
      message: 'Use "a.reverse" instead (avoid mutation side-effects)',
      selector: ".callee[property.name=reverse] > .object",
      typeHas: utils.TypeGroup.array
    }
  ]
});
