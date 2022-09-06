"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noNodejsModules = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noNodejsModules = utils.wrapRule({
    rule: base_1.base["disallow-import"],
    options: [{ disallow: ["node:*"] }],
    docs: {
        description: "Disallows importing NodeJS modules.",
        failExamples: 'import x from "node:fs";',
        passExamples: 'import x from "fs";'
    }
});
//# sourceMappingURL=no-nodejs-modules.js.map