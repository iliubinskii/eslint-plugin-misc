import * as utils from "../../utils";
import { a } from "real-fns";
export var MessageId;
(function (MessageId) {
    MessageId["incorrectSortingOrder"] = "incorrectSortingOrder";
})(MessageId || (MessageId = {}));
export const sortVBind = utils.createRule({
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
                        loc: context.getLoc(a.get(node.attributes, vBindIndex).range),
                        messageId: MessageId.incorrectSortingOrder
                    });
            }
        }
    })
});
//# sourceMappingURL=sort-v-bind.js.map