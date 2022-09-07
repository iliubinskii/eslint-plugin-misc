"use strict";
/* eslint-disable misc/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noOwnPropsExtends = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const core_1 = require("../../core");
exports.noOwnPropsExtends = utils.wrapRule({
    rule: core_1.core["no-restricted-syntax"],
    options: [
        {
            message: 'No extends in "OwnProps" interface',
            selector: "TSInterfaceDeclaration[id.name=OwnProps] > TSInterfaceHeritage.extends"
        }
    ]
});
//# sourceMappingURL=no-OwnProps-extends.js.map