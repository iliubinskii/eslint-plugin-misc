"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferJson = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferJson = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        { message: 'Use "json" module instead', selector: "Identifier[name=JSON]" }
    ]
});
//# sourceMappingURL=prefer-json.js.map