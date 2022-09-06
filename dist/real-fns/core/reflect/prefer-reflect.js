"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferReflect = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../../utils"));
const core_1 = require("../../../core");
exports.preferReflect = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'Use "reflect" module instead',
            selector: "Identifier[name=Reflect]"
        }
    ]
});
//# sourceMappingURL=prefer-reflect.js.map