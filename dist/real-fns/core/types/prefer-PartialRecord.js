"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferPartialRecord = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferPartialRecord = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "PartialRecord" type instead',
            selector: "TSTypeReference[typeName.name=Partial] > TSTypeParameterInstantiation > TSTypeReference:first-child > Identifier.typeName[name=Rec]"
        }
    ]
});
//# sourceMappingURL=prefer-PartialRecord.js.map