"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentEnumMembers = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["inconsistentMember"] = "inconsistentMember";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.consistentEnumMembers = utils.createRule({
    name: "consistent-enum-members",
    vue: true,
    messages: { [MessageId.inconsistentMember]: "Inconsistent key-value pair" },
    docs: {
        description: "Requires consistent key-value pairs inside enums (key should match value).",
        failExamples: `
      enum Enum {
        a = "b"
      }
    `,
        passExamples: `
      enum Enum {
        a = "a"
      }
    `
    },
    create: (context) => ({
        TSEnumMember: node => {
            if (node.id.type === utils_1.AST_NODE_TYPES.Identifier &&
                node.initializer &&
                node.initializer.type === utils_1.AST_NODE_TYPES.Literal &&
                node.id.name !== node.initializer.value)
                context.report({ messageId: MessageId.inconsistentMember, node });
        }
    })
});
//# sourceMappingURL=consistent-enum-members.js.map