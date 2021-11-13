/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferIndexedRecord = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "IndexedRecord" type instead',
      selector:
        "TSTypeReference[typeName.name=Rec] > TSTypeParameterInstantiation > TSStringKeyword:first-child"
    }
  ]
});
