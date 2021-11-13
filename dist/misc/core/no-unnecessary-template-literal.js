"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnnecessaryTemplateLiteral = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
var MessageId;
(function (MessageId) {
    MessageId["unnecessaryTemplateLiteral"] = "unnecessaryTemplateLiteral";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noUnnecessaryTemplateLiteral = utils.createRule({
    name: "no-unnecessary-template-literal",
    vue: true,
    messages: {
        [MessageId.unnecessaryTemplateLiteral]: "Unnecessary template literal"
    },
    docs: {
        description: "Disallows unnecessary template literals.",
        failExamples: `
      const x = \`
        text
      \`;
    `,
        passExamples: `
      const x = "text";

      const y = \`
        text
        text
      \`;

      const z = \`
        text \${x} text
      \`;
    `
    },
    create: (context) => ({
        TemplateLiteral: node => {
            if (node.expressions.length ||
                node.quasis.some(quasi => quasi.value.raw.trim().includes("\n"))) {
                // Valid
            }
            else
                context.report({
                    messageId: MessageId.unnecessaryTemplateLiteral,
                    node
                });
        }
    })
});
//# sourceMappingURL=no-unnecessary-template-literal.js.map