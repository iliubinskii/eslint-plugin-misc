"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noInferrableTypes = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["triviallyInferrableType"] = "triviallyInferrableType";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noInferrableTypes = utils.createRule({
    name: "no-inferrable-types",
    vue: true,
    messages: {
        [MessageId.triviallyInferrableType]: "Type can be trivially inferred from initializer"
    },
    docs: {
        description: "Reports inferrable types.",
        failExamples: `
      function f<T>() {
        const x: T = {} as T;
      }

    `,
        passExamples: `
      function f<T>() {
        const x = {} as T;
      }
    `
    },
    create: (context) => ({
        VariableDeclarator: node => {
            const { id, init } = node;
            if (id.typeAnnotation &&
                init &&
                init.type === utils_1.AST_NODE_TYPES.TSAsExpression) {
                const type1 = id.typeAnnotation.typeAnnotation;
                const type2 = init.typeAnnotation;
                const text1 = context.getText(type1);
                const text2 = context.getText(type2);
                if (text1 === text2)
                    context.report({
                        messageId: MessageId.triviallyInferrableType,
                        node: type1
                    });
            }
        }
    })
});
//# sourceMappingURL=no-inferrable-types.js.map