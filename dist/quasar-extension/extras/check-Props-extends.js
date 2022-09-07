"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPropsExtends = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.checkPropsExtends = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
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
//# sourceMappingURL=check-Props-extends.js.map