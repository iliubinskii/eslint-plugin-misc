/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferPartialRecord = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "PartialRecord" type instead',
      selector:
        "TSTypeReference[typeName.name=Partial] > TSTypeParameterInstantiation > TSTypeReference:first-child > Identifier.typeName[name=Rec]"
    }
  ]
});
