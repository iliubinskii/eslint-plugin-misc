"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noOwnSlotsExtends = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noOwnSlotsExtends = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'No extends in "OwnSlots" interface',
            selector: "TSInterfaceDeclaration[id.name=OwnSlots] > TSInterfaceHeritage.extends"
        }
    ]
});
//# sourceMappingURL=no-OwnSlots-extends.js.map