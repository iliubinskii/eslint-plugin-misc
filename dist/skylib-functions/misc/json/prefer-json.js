"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferJson = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferJson = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        { message: 'Use "json" module instead', selector: "Identifier[name=JSON]" }
    ]
});
//# sourceMappingURL=prefer-json.js.map