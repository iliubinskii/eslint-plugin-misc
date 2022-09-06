"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferIndexedObject = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferIndexedObject = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "IndexedObject" type instead',
            selector: "TSTypeReference[typeName.name=Rec] > TSTypeParameterInstantiation > TSTypeReference:first-child > Identifier.typeName[name=PropertyKey]"
        }
    ]
});
//# sourceMappingURL=prefer-IndexedObject.js.map