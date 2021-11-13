"use strict";
/* eslint-disable @skylib/consistent-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.noOwnPropsExtends = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const misc_1 = require("../../misc");
exports.noOwnPropsExtends = utils.wrapRule({
    rule: misc_1.misc["no-restricted-syntax"],
    options: [
        {
            message: 'No extends in "OwnProps" interface',
            selector: "TSInterfaceDeclaration[id.name=OwnProps] > TSInterfaceHeritage.extends"
        }
    ]
});
//# sourceMappingURL=no-OwnProps-extends.js.map