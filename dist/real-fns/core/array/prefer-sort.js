"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferSort = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const typescript_1 = require("../../../typescript");
exports.preferSort = utils.wrapRule({
    rule: typescript_1.typescript["typescript/no-restricted-syntax"],
    options: [
        {
            message: 'Use "a.sort" instead (avoid mutation side-effects)',
            selector: ".callee[property.name=sort] > .object",
            typeHas: utils.TypeGroup.array
        }
    ]
});
//# sourceMappingURL=prefer-sort.js.map