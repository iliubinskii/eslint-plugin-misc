"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnsafeObjectAssignment = exports.MessageId = void 0;
const tslib_1 = require("tslib");
// eslint-disable-next-line @skylib/disallow-import/typescript -- Ok
const ts = tslib_1.__importStar(require("typescript"));
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["unsafeOptionalAssignment"] = "unsafeOptionalAssignment";
    MessageId["unsafeReadonlyAssignment"] = "unsafeReadonlyAssignment";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.noUnsafeObjectAssignment = utils.createRule({
    name: "no-unsafe-object-assignment",
    vue: false,
    messages: {
        [MessageId.unsafeOptionalAssignment]: "Unsafe optional assignment: {{name}}",
        [MessageId.unsafeReadonlyAssignment]: "Unsafe readonly-to-mutable assignment: {{name}}"
    },
    docs: {
        description: `
      Reports unsafe object assignments:
      - Unsafe optional assignment
      - Unsafe readonly-to-mutable assignment
    `,
        failExamples: `
      interface ReadonlyObject { readonly value: number; }
      interface WritableObject { value: number; }

      const x: ReadonlyObject = { value: 1 };

      function f(x: WritableObject) {}

      f(x);
    `,
        passExamples: `
      interface ReadonlyObject { readonly value: number; }
      interface WritableObject { value: number; }

      const x: WritableObject = { value: 1 };

      function f(x: ReadonlyObject) {}

      f(x);
    `
    },
    create: (context, typeCheck) => {
        return {
            ArrowFunctionExpression: node => {
                if (node.body.type === utils_1.AST_NODE_TYPES.BlockStatement) {
                    // Сhecked by ReturnStatement visitor
                }
                else if (node.returnType)
                    lintDestSource(node.returnType.typeAnnotation, node.body);
                else {
                    // No return type to check
                }
            },
            AssignmentExpression: node => {
                lintDestSource(node.left, node.right);
            },
            CallExpression: node => {
                for (const arg of node.arguments)
                    lintNode(arg);
            },
            PropertyDefinition: node => {
                if (node.value)
                    lintDestSource(node.key, node.value);
            },
            ReturnStatement: node => {
                if (node.argument)
                    lintNode(node.argument);
            },
            VariableDeclarator: node => {
                if (node.init)
                    lintDestSource(node.id, node.init);
            }
        };
        function lintDestSource(dest, source) {
            if (source.type === utils_1.AST_NODE_TYPES.ObjectExpression) {
                // Ignore
            }
            else {
                const destType = typeCheck.getType(dest);
                const sourceType = typeCheck.getType(source);
                lintTypes(destType, sourceType, source);
            }
        }
        function lintNode(node) {
            if (node.type === utils_1.AST_NODE_TYPES.ObjectExpression) {
                // Ignore
            }
            else {
                const destType = typeCheck.getContextualType(node);
                const sourceType = typeCheck.getType(node);
                if (destType)
                    lintTypes(destType, sourceType, node);
            }
        }
        function lintTypes(dest, source, node) {
            if (dest === source) {
                // Ignore self-assignment
            }
            else if (typeCheck.isObjectType(dest) &&
                typeCheck.isObjectType(source)) {
                for (const destProperty of dest.getProperties())
                    if (destProperty.name.startsWith("__@")) {
                        // Ignore internal properties
                    }
                    else {
                        const sourceProperty = source.getProperty(destProperty.name);
                        if (sourceProperty) {
                            const destReadonly = typeCheck.isReadonlyProperty(destProperty, dest);
                            const sourceReadonly = typeCheck.isReadonlyProperty(sourceProperty, source);
                            if (sourceReadonly && !destReadonly) {
                                context.report({
                                    data: { name: destProperty.name },
                                    messageId: MessageId.unsafeReadonlyAssignment,
                                    node
                                });
                                return;
                            }
                        }
                        else {
                            context.report({
                                data: { name: destProperty.name },
                                messageId: MessageId.unsafeOptionalAssignment,
                                node
                            });
                            return;
                        }
                    }
                for (const kind of [ts.IndexKind.Number, ts.IndexKind.String]) {
                    const sourceIndex = typeCheck.getIndexInfo(source, kind);
                    const destIndex = typeCheck.getIndexInfo(dest, kind);
                    if (sourceIndex &&
                        destIndex &&
                        sourceIndex.isReadonly &&
                        !destIndex.isReadonly) {
                        context.report({
                            data: { name: "Index signature" },
                            messageId: MessageId.unsafeReadonlyAssignment,
                            node
                        });
                        return;
                    }
                }
            }
            else {
                // Ignore non-object types
            }
        }
    }
});
//# sourceMappingURL=no-unsafe-object-assignment.js.map