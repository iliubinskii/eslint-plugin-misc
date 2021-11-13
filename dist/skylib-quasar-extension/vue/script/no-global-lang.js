"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noGlobalLang = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noGlobalLang = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: "No global lang",
            selector: "ImportDeclaration[importKind=value][source.value=@skylib/facades] > ImportSpecifier[imported.name=lang]"
        }
    ]
});
//# sourceMappingURL=no-global-lang.js.map