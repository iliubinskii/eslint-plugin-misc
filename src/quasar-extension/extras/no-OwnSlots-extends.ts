/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const noOwnSlotsExtends = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'No extends in "OwnSlots" interface',
      selector:
        "TSInterfaceDeclaration[id.name=OwnSlots] > TSInterfaceHeritage.extends"
    }
  ]
});
