/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

// eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
export const preferMockCallsToBe = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'Use "mockCallsToBe" function instead',
      selector: [
        "Identifier[name=mockClear]",
        "Identifier[name=toHaveBeenCalled]",
        "Identifier[name=toHaveBeenCalledTimes]",
        "Identifier[name=toHaveBeenCalledWith]"
      ]
    }
  ]
});
