"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noChainCoalescenceMixture = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noChainCoalescenceMixture = utils.wrapRule({
    rule: base_1.base["no-restricted-syntax"],
    options: [
        {
            message: "Do not mix chain and coalescence operators",
            selector: "LogicalExpression[operator=??][left.type=ChainExpression]"
        }
    ],
    docs: {
        description: "Disallows mixing of chain and coalescence operators.",
        failExamples: "x?.y ?? z;",
        passExamples: `
      x?.y;
      x ?? y;
    `
    }
});
//# sourceMappingURL=no-chain-coalescence-mixture.js.map