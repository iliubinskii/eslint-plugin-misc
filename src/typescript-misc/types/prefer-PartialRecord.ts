/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const preferPartialRecord = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "PartialRecord" type instead',
      selector:
        "TSTypeReference[typeName.name=Partial] > TSTypeParameterInstantiation > TSTypeReference:first-child > Identifier.typeName[name=Rec]"
    }
  ]
});
