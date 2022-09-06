"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noNever = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noNever = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: 'Avoid "never" type',
            selector: "Identifier",
            typeIs: utils.TypeGroup.never
        }
    ],
    docs: {
        description: 'Disallow "never" type.',
        failExamples: 'function f(value: "a" & "b") {}',
        passExamples: 'function f(value: "a" | "b") {}'
    }
});
//# sourceMappingURL=no-never.js.map