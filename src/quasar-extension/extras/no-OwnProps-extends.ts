/* eslint-disable misc/consistent-filename -- Ok */

import * as utils from "../../utils";
import { core } from "../../core";

export const noOwnPropsExtends = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: 'No extends in "OwnProps" interface',
      selector:
        "TSInterfaceDeclaration[id.name=OwnProps] > TSInterfaceHeritage.extends"
    }
  ]
});
