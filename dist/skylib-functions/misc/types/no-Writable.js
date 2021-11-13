"use strict";
/* eslint-disable @skylib/consistent-filename -- Postponed */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noWritable = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const misc_1 = require("../../../misc");
exports.noWritable = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'Use "Writable..." type instead',
            selector: "TSTypeReference[typeName.name=Writable] > .typeParameters > .params:first-child > .typeName[name=/^(?:IndexedObject|IndexedRecord|PartialRecord|Rec)$/u]"
        }
    ]
});
//# sourceMappingURL=no-Writable.js.map