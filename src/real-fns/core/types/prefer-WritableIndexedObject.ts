/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferWritableIndexedObject = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "WritableIndexedObject" type instead',
      selector:
        "TSTypeReference[typeName.name=WritableRecord] > TSTypeParameterInstantiation > TSTypeReference:first-child > Identifier.typeName[name=PropertyKey]"
    }
  ]
});
