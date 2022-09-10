"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentOptionalProps = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const consistent_optional_props_1 = require("../../core/base/consistent-optional-props");
const core_1 = require("../../core");
exports.consistentOptionalProps = utils.wrapRule({
    rule: core_1.core["consistent-optional-props"],
    options: [
        {
            overrides: [
                {
                    _id: "Props",
                    pattern: "^(?:Props|OwnProps)$",
                    style: consistent_optional_props_1.Style.combined,
                    target: consistent_optional_props_1.Target.interfaces
                },
                {
                    _id: "Props.event",
                    pattern: "^(?:Props|OwnProps)$",
                    propertyPattern: "^on[A-Z]",
                    style: consistent_optional_props_1.Style.optional,
                    target: consistent_optional_props_1.Target.interfaces
                },
                {
                    _id: "Slots",
                    pattern: "^(?:Slots|OwnSlots)$",
                    style: consistent_optional_props_1.Style.combined,
                    target: consistent_optional_props_1.Target.interfaces
                },
                {
                    _id: "Slots.event",
                    pattern: "^(?:Slots|OwnSlots)$",
                    propertyPattern: "^on[A-Z]",
                    style: consistent_optional_props_1.Style.optional,
                    target: consistent_optional_props_1.Target.interfaces
                }
            ]
        }
    ]
});
//# sourceMappingURL=consistent-optional-props.js.map