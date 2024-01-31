"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferNumStr = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.preferNumStr = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "NumStr" type instead',
            selector: [
                "TSUnionType[types.0.type=TSNumberKeyword][types.1.type=TSStringKeyword]",
                "TSUnionType[types.0.type=TSNumberKeyword][types.2.type=TSStringKeyword]",
                "TSUnionType[types.1.type=TSNumberKeyword][types.0.type=TSStringKeyword]",
                "TSUnionType[types.1.type=TSNumberKeyword][types.2.type=TSStringKeyword]",
                "TSUnionType[types.2.type=TSNumberKeyword][types.0.type=TSStringKeyword]",
                "TSUnionType[types.2.type=TSNumberKeyword][types.1.type=TSStringKeyword]"
            ]
        }
    ]
});
//# sourceMappingURL=prefer-NumStr.js.map