"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noGlobalIcons = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noGlobalIcons = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "No global icons",
            selector: "ImportDeclaration[importKind=value][source.value=@skylib/facades] > ImportSpecifier[imported.name=icons]"
        }
    ]
});
//# sourceMappingURL=no-global-icons.js.map