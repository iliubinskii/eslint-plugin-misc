"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferMockCallsToBe = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
// eslint-disable-next-line misc/max-identifier-blocks -- Ok
exports.preferMockCallsToBe = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "mockCallsToBe" function instead',
            selector: [
                "Identifier[name=mockClear]",
                "Identifier[name=toHaveBeenCalled]",
                "Identifier[name=toHaveBeenCalledTimes]",
                "Identifier[name=toHaveBeenCalledWith]"
            ]
        }
    ]
});
//# sourceMappingURL=prefer-mockCallsToBe.js.map