/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const noOwnSlotsExtends = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'No extends in "OwnSlots" interface',
      selector:
        "TSInterfaceDeclaration[id.name=OwnSlots] > TSInterfaceHeritage.extends"
    }
  ]
});
