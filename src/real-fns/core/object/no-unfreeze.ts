import * as utils from "../../../utils";
import { core } from "../../../core";

export const noUnfreeze = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'Using "o.unfreeze" is unsafe',
      selector:
        "CallExpression > .callee[object.name=o][property.name=unfreeze]"
    }
  ]
});
