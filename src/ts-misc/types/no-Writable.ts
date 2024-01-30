/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const noWritable = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "Writable..." type instead',
      selector:
        "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=/^(?:IndexedObject|IndexedRecord|PartialRecord|Rec)$/u]"
    }
  ]
});
