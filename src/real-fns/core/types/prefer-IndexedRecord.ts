/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferIndexedRecord = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "IndexedRecord" type instead',
      selector:
        "TSTypeReference[typeName.name=Rec] > TSTypeParameterInstantiation > TSStringKeyword:first-child"
    }
  ]
});
