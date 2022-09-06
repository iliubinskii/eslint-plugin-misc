"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noInternalModules = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const base_1 = require("./base");
exports.noInternalModules = utils.wrapRule({
    rule: base_1.base["disallow-import"],
    options: [{ allow: "@/**", disallow: ["./*/**", "[^@]*/**", "@*/*/**"] }],
    docs: {
        description: "Disallows importing of internal modules.",
        failExamples: `
      import "./folder/internal";
      import "package/internal";
      import "@scope/package/internal";

    `,
        passExamples: `
      import "./folder";
      import "package";
      import "@scope/package";
    `
    }
});
//# sourceMappingURL=no-internal-modules.js.map