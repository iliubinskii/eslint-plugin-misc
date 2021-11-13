"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noEmptyInterfaces = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noEmptyInterfaces = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "Empty interface is not allowed",
            selector: "TSInterfaceDeclaration[body.body.length=0][extends=undefined] > Identifier[name!=Props][name!=Slots]"
        }
    ]
});
//# sourceMappingURL=no-empty-interfaces.js.map