"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noUnsafeObjectAssignment = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
const typescript_misc_1 = require("typescript-misc");
var MessageId;
(function (MessageId) {
    MessageId["unsafeOptionalAssignment"] = "unsafeOptionalAssignment";
    MessageId["unsafeReadonlyAssignment"] = "unsafeReadonlyAssignment";
})(MessageId || (exports.MessageId = MessageId = {}));
exports.noUnsafeObjectAssignment = utils.createRule({
    name: "no-unsafe-object-assignment",
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
                    // Checked by ReturnStatement
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
            if (source.type === utils_1.AST_NODE_TYPES.ArrayExpression ||
                source.type === utils_1.AST_NODE_TYPES.ObjectExpression) {
                // Ignore
            }
            else {
                const destType = typeCheck.getType(dest);
                const sourceType = typeCheck.getType(source);
                lintTypes(destType, sourceType, source);
            }
        }
        function lintNode(node) {
            if (node.type === utils_1.AST_NODE_TYPES.ArrayExpression ||
                node.type === utils_1.AST_NODE_TYPES.ObjectExpression) {
                // Ignore
            }
            else {
                const destType = typeCheck.getContextualType(node);
                const sourceType = typeCheck.getType(node);
                if (destType)
                    lintTypes(destType, sourceType, node);
            }
        }
        function lintProperties(dest, source, node) {
            return lintProperties1(dest, source, node);
        }
        function lintProperties1(dest, source, node) {
            for (const sourcePart of source.isUnion() ? source.types : [source]) {
                const report = lintProperties2(dest, sourcePart, node);
                if (report)
                    return report;
            }
            return undefined;
        }
        function lintProperties2(dest, source, node) {
            const reports = [];
            for (const destPart of dest.isUnion() ? dest.types : [dest]) {
                const report = lintProperties3(destPart, source, node);
                if (report)
                    reports.push(report);
                else
                    return undefined;
            }
            return typescript_misc_1.a.first(reports);
        }
        function lintProperties3(dest, source, node) {
            if (dest === source)
                return undefined;
            for (const destProperty of dest.getProperties())
                if (destProperty.name.startsWith("__@")) {
                    // Ignore internal properties
                }
                else {
                    const sourceProperty = source.getProperty(destProperty.name);
                    if (sourceProperty) {
                        const destReadonly = typeCheck.isReadonlyProperty(destProperty, dest);
                        const sourceReadonly = typeCheck.isReadonlyProperty(sourceProperty, source);
                        if (sourceReadonly && !destReadonly)
                            return {
                                data: { name: destProperty.name },
                                messageId: MessageId.unsafeReadonlyAssignment,
                                node
                            };
                    }
                    else
                        return {
                            data: { name: destProperty.name },
                            messageId: MessageId.unsafeOptionalAssignment,
                            node
                        };
                }
            return undefined;
        }
        function lintSignatures(dest, source, node) {
            for (const kind of [ts.IndexKind.Number, ts.IndexKind.String]) {
                const destIndex = typeCheck.getIndexInfo(dest, kind);
                const sourceIndex = typeCheck.getIndexInfo(source, kind);
                if (destIndex && sourceIndex) {
                    if (sourceIndex.isReadonly && !destIndex.isReadonly)
                        return {
                            data: { name: "Index signature" },
                            messageId: MessageId.unsafeReadonlyAssignment,
                            node
                        };
                    const report = lintProperties(destIndex.type, sourceIndex.type, node);
                    if (report)
                        return report;
                }
            }
            return undefined;
        }
        function lintTypes(dest, source, node) {
            const report = lintProperties(dest, source, node) ??
                lintSignatures(dest, source, node);
            if (report)
                context.report(report);
        }
    }
});
//# sourceMappingURL=no-unsafe-object-assignment.js.map