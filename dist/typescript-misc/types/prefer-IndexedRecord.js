"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferIndexedRecord = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.preferIndexedRecord = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "IndexedRecord" type instead',
            selector: "TSTypeReference[typeName.name=Rec] > TSTypeParameterInstantiation > TSStringKeyword:first-child"
        }
    ]
});
//# sourceMappingURL=prefer-IndexedRecord.js.map