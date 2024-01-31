"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferWritableIndexedObject = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.preferWritableIndexedObject = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "WritableIndexedObject" type instead',
            selector: "TSTypeReference[typeName.name=WritableRecord] > TSTypeParameterInstantiation > TSTypeReference:first-child > Identifier.typeName[name=PropertyKey]"
        }
    ]
});
//# sourceMappingURL=prefer-WritableIndexedObject.js.map