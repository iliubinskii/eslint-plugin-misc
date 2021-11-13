/* eslint-disable @skylib/consistent-filename -- Ok */

import * as utils from "../../utils";
import { misc } from "../../misc";

export const checkPropsExtends = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Incorrect extends",
      selector: [
        "TSInterfaceDeclaration[id.name=Props][extends.length=1] > TSInterfaceHeritage.extends:nth-child(1) > Identifier.expression[name!=ParentProps][name!=PluginProps][name!=OwnProps]",
        "TSInterfaceDeclaration[id.name=Props][extends.length=2] > TSInterfaceHeritage.extends:nth-child(1) > Identifier.expression[name!=ParentProps][name!=PluginProps]",
        "TSInterfaceDeclaration[id.name=Props][extends.length=2] > TSInterfaceHeritage.extends:nth-child(2) > Identifier.expression[name!=PluginProps][name!=OwnProps]",
        "TSInterfaceDeclaration[id.name=Props][extends.length=3] > TSInterfaceHeritage.extends:nth-child(1) > Identifier.expression[name!=ParentProps]",
        "TSInterfaceDeclaration[id.name=Props][extends.length=3] > TSInterfaceHeritage.extends:nth-child(2) > Identifier.expression[name!=PluginProps]",
        "TSInterfaceDeclaration[id.name=Props][extends.length=3] > TSInterfaceHeritage.extends:nth-child(3) > Identifier.expression[name!=OwnProps]",
        "TSInterfaceDeclaration[id.name=Props][extends.length>3]"
      ]
    }
  ]
});
