/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const preferNumStr = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "NumStr" type instead',
      selector: [
        "TSUnionType[types.0.type=TSNumberKeyword][types.1.type=TSStringKeyword]",
        "TSUnionType[types.0.type=TSNumberKeyword][types.2.type=TSStringKeyword]",
        "TSUnionType[types.1.type=TSNumberKeyword][types.0.type=TSStringKeyword]",
        "TSUnionType[types.1.type=TSNumberKeyword][types.2.type=TSStringKeyword]",
        "TSUnionType[types.2.type=TSNumberKeyword][types.0.type=TSStringKeyword]",
        "TSUnionType[types.2.type=TSNumberKeyword][types.1.type=TSStringKeyword]"
      ]
    }
  ]
});
