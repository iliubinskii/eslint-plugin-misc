/* eslint-disable misc/consistent-filename -- Ok */
import * as utils from "../../utils";
import { core } from "../../core";
export const checkSlotsExtends = utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
        {
            message: "Incorrect extends",
            selector: [
                "TSInterfaceDeclaration[id.name=Slots][extends.length=1] > TSInterfaceHeritage.extends:nth-child(1) > Identifier.expression[name!=ParentSlots][name!=PluginSlots][name!=OwnSlots]",
                "TSInterfaceDeclaration[id.name=Slots][extends.length=2] > TSInterfaceHeritage.extends:nth-child(1) > Identifier.expression[name!=ParentSlots][name!=PluginSlots]",
                "TSInterfaceDeclaration[id.name=Slots][extends.length=2] > TSInterfaceHeritage.extends:nth-child(2) > Identifier.expression[name!=PluginSlots][name!=OwnSlots]",
                "TSInterfaceDeclaration[id.name=Slots][extends.length=3] > TSInterfaceHeritage.extends:nth-child(1) > Identifier.expression[name!=ParentSlots]",
                "TSInterfaceDeclaration[id.name=Slots][extends.length=3] > TSInterfaceHeritage.extends:nth-child(2) > Identifier.expression[name!=PluginSlots]",
                "TSInterfaceDeclaration[id.name=Slots][extends.length=3] > TSInterfaceHeritage.extends:nth-child(3) > Identifier.expression[name!=OwnSlots]",
                "TSInterfaceDeclaration[id.name=Slots][extends.length>3]"
            ]
        }
    ]
});
//# sourceMappingURL=check-Slots-extends.js.map