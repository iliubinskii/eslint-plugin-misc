"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferQuasarComponents = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferQuasarComponents = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        { message: "Prefer quasar component", selector: "VElement[name=/^e-/u]" }
    ]
});
//# sourceMappingURL=prefer-quasar-components.js.map