"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferPartialRecord = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.preferPartialRecord = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "PartialRecord" type instead',
            selector: "TSTypeReference[typeName.name=Partial] > TSTypeParameterInstantiation > TSTypeReference:first-child > Identifier.typeName[name=Rec]"
        }
    ]
});
//# sourceMappingURL=prefer-PartialRecord.js.map