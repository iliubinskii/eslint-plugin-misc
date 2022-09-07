/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const preferOwnProps = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Use "OwnProps" interface',
      selector:
        "TSInterfaceDeclaration[id.name=/^(?:Props|ParentProps)$/u] > TSInterfaceBody.body[body.length>0]"
    }
  ]
});
