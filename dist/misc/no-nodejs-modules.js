"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noNodejsModules = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const core_1 = require("./core");
exports.noNodejsModules = utils.wrapRule({
    rule: core_1.core["disallow-import"],
    options: [{ disallow: ["node:*"] }],
    docs: {
        description: "Disallows importing NodeJS modules.",
        failExamples: `
      import x from "node:fs";
    `,
        passExamples: `
      import x from "fs";
    `
    }
});
//# sourceMappingURL=no-nodejs-modules.js.map