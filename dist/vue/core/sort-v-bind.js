"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortVBind = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
var MessageId;
(function (MessageId) {
    MessageId["incorrectSortingOrder"] = "incorrectSortingOrder";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.sortVBind = utils.createRule({
    name: "sort-v-bind",
    vue: true,
    messages: { [MessageId.incorrectSortingOrder]: "Incorrect sorting order" },
    docs: {
        description: 'Sorts "v-bind" directive.',
        failExamples: `
      <template>
        <slot v-bind="obj" prop="prop" @click="click"></slot>
      </template>
    `,
        passExamples: `
      <template>
        <slot prop="prop" v-bind="obj" @click="click"></slot>
      </template>
    `
    },
    create: (context) => ({
        VStartTag: (node) => {
            if (node.attributes.length > 1) {
                const vBindIndex = node.attributes.findIndex(attribute => attribute.key.type === "VDirectiveKey" &&
                    attribute.key.argument === null &&
                    attribute.key.name.name === "bind");
                if (vBindIndex >= 0 &&
                    node.attributes.some((attribute, index) => index > vBindIndex && !attribute.directive))
                    context.report({
                        loc: context.getLoc(functions_1.a.get(node.attributes, vBindIndex).range),
                        messageId: MessageId.incorrectSortingOrder
                    });
            }
        }
    })
});
//# sourceMappingURL=sort-v-bind.js.map