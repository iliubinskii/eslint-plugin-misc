"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noGlobalLang = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.noGlobalLang = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: "No global lang",
            selector: "ImportDeclaration[importKind=value][source.value=real-facades] > ImportSpecifier[imported.name=lang]"
        }
    ]
});
//# sourceMappingURL=no-global-lang.js.map