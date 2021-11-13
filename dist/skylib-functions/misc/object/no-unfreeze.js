"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnfreeze = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noUnfreeze = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Using "o.unfreeze" is unsafe',
            selector: "CallExpression > .callee[object.name=o][property.name=unfreeze]"
        }
    ]
});
//# sourceMappingURL=no-unfreeze.js.map