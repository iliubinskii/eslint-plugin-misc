/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const noOwnPropsExtends = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: 'No extends in "OwnProps" interface',
      selector:
        "TSInterfaceDeclaration[id.name=OwnProps] > TSInterfaceHeritage.extends"
    }
  ]
});
