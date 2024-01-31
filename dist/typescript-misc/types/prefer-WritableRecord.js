"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferWritableRecord = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.preferWritableRecord = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "WritableRecord" type instead',
            selector: "Identifier[name=Record]"
        }
    ]
});
//# sourceMappingURL=prefer-WritableRecord.js.map