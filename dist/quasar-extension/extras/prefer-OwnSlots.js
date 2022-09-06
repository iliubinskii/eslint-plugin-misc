"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferOwnSlots = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.preferOwnSlots = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "OwnSlots" interface',
            selector: "TSInterfaceDeclaration[id.name=/^(?:Slots|ParentSlots)$/u] > TSInterfaceBody.body[body.length>0]"
        }
    ]
});
//# sourceMappingURL=prefer-OwnSlots.js.map