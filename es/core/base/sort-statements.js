import * as _ from "lodash-commonjs-es";
import * as utils from "../../utils";
import { a, assert, evaluate, is, o, s } from "real-fns";
import { AST_NODE_TYPES } from "@typescript-eslint/utils";
export var StatementType;
(function (StatementType) {
    StatementType["Declare"] = "Declare";
    StatementType["DeclareGlobal"] = "DeclareGlobal";
    StatementType["ExportAllDeclaration"] = "ExportAllDeclaration";
    StatementType["ExportDeclaration"] = "ExportDeclaration";
    StatementType["ExportDefaultDeclaration"] = "ExportDefaultDeclaration";
    StatementType["ExportFunctionDeclaration"] = "ExportFunctionDeclaration";
    StatementType["ExportTypeDeclaration"] = "ExportTypeDeclaration";
    StatementType["ExportUnknown"] = "ExportUnknown";
    StatementType["FunctionDeclaration"] = "FunctionDeclaration";
    StatementType["ImportDeclaration"] = "ImportDeclaration";
    StatementType["JestTest"] = "JestTest";
    StatementType["TypeDeclaration"] = "TypeDeclaration";
    StatementType["Unknown"] = "Unknown";
})(StatementType || (StatementType = {}));
export const isStatementType = is.factory(is.enumeration, StatementType);
export const isStatementTypes = is.factory(is.array.of, isStatementType);
export const sortStatements = utils.createRule({
    name: "sort-statements",
    fixable: utils.Fixable.code,
    vue: true,
    isOptions: is.object.factory({
        blockOrder: isStatementTypes,
        moduleOrder: isStatementTypes,
        order: isStatementTypes,
        programOrder: isStatementTypes
    }, {}),
    defaultOptions: {
        blockOrder: [],
        moduleOrder: [],
        order: [],
        programOrder: []
    },
    messages: utils.sort.messages,
    docs: {
        description: `
      Sorts statements.

      \`\`\`ts
      StatementType =
        | "Declare"
        | "DeclareGlobal"
        | "ExportAllDeclaration"
        | "ExportDeclaration"
        | "ExportDefaultDeclaration"
        | "ExportFunctionDeclaration"
        | "ExportTypeDeclaration"
        | "ExportUnknown"
        | "FunctionDeclaration"
        | "ImportDeclaration"
        | "JestTest"
        | "TypeDeclaration"
        | "Unknown";
      \`\`\`
    `,
        optionTypes: {
            blockOrder: "StatementType[]",
            moduleOrder: "StatementType[]",
            order: "StatementType[]",
            programOrder: "StatementType[]"
        },
        optionDescriptions: {
            blockOrder: "Order inside block statement",
            moduleOrder: "Order inside module declaration",
            order: "Default order",
            programOrder: "Root statements order"
        },
        failExamples: `
      function f() {}
      type T1 = number;
      const x1 = true;
      const x2 = true;
      export function g() {}
      export type T2 = number;
      export const x3 = true;
      export const x4 = true;
      export * from "source";
      declare global {}
      import "source";
    `,
        passExamples: `
      import "source";
      declare global {}
      export * from "source";
      export const x1 = true;
      export const x2 = true;
      export type T1 = number;
      export function f() {}
      const x3 = true;
      const x4 = true;
      type T2 = number;
      function g() {}
    `
    },
    create: (context) => {
        const { blockOrder, moduleOrder, order, programOrder } = context.options;
        return {
            BlockStatement: node => {
                utils.sort(node.body, context, {
                    sortingOrder: sortingOrder(_.uniq([...blockOrder, ...order, ...defaultOrder]))
                });
            },
            Program: node => {
                utils.sort(node.body, context, {
                    sortingOrder: sortingOrder(_.uniq([...programOrder, ...order, ...defaultOrder]))
                });
            },
            TSModuleBlock: node => {
                utils.sort(node.body, context, {
                    sortingOrder: sortingOrder(_.uniq([...moduleOrder, ...order, ...defaultOrder]))
                });
            }
        };
    }
});
const defaultOrder = [
    StatementType.ImportDeclaration,
    StatementType.DeclareGlobal,
    StatementType.Declare,
    StatementType.ExportAllDeclaration,
    StatementType.ExportDeclaration,
    StatementType.ExportDefaultDeclaration,
    StatementType.ExportUnknown,
    StatementType.ExportFunctionDeclaration,
    StatementType.ExportTypeDeclaration,
    StatementType.Unknown,
    StatementType.FunctionDeclaration,
    StatementType.TypeDeclaration,
    StatementType.JestTest
];
const prepareForComparison = evaluate(() => {
    const priority = ":,.";
    const keys = a.fromString(priority);
    const values = a.sort(a.fromString(priority));
    const map = o.fromEntries(keys.map((key, index) => [key, a.get(values, index)]));
    // eslint-disable-next-line security/detect-non-literal-regexp -- Ok
    const re = new RegExp(`[${s.escapeRegExpSpecialChars(priority)}]`, "gu");
    return (str) => str.replace(re, callback);
    function callback(char) {
        return map[char];
    }
});
/**
 * Checks identifier name.
 *
 * @param node - Node.
 * @param names - Expected names.
 * @returns _True_ if node is an identifier with expected name, _false_ otherwise.
 */
function checkIdentifierName(node, ...names) {
    return node.type === AST_NODE_TYPES.Identifier && names.includes(node.name);
}
/**
 * Returns Jest test name.
 *
 * @param node - Node.
 * @returns Test name if node contains Jest test, _undefined_ otherwise.
 */
function getJestTestName(node) {
    if (node.expression.type === AST_NODE_TYPES.CallExpression) {
        const argument = node.expression.arguments[0];
        if (argument &&
            argument.type === AST_NODE_TYPES.Literal &&
            is.string(argument.value)) {
            const { callee } = node.expression;
            if ((callee.type === AST_NODE_TYPES.Identifier && callee.name === "test") ||
                (callee.type === AST_NODE_TYPES.MemberExpression &&
                    checkIdentifierName(callee.object, "test") &&
                    checkIdentifierName(callee.property, "only", "skip")) ||
                (callee.type === AST_NODE_TYPES.CallExpression &&
                    callee.callee.type === AST_NODE_TYPES.MemberExpression &&
                    checkIdentifierName(callee.callee.object, "test") &&
                    checkIdentifierName(callee.callee.property, "each")) ||
                (callee.type === AST_NODE_TYPES.CallExpression &&
                    callee.callee.type === AST_NODE_TYPES.MemberExpression &&
                    callee.callee.object.type === AST_NODE_TYPES.MemberExpression &&
                    checkIdentifierName(callee.callee.object.object, "test") &&
                    checkIdentifierName(callee.callee.object.property, "only", "skip") &&
                    checkIdentifierName(callee.callee.property, "each")))
                return prepareForComparison(argument.value);
        }
    }
    return undefined;
}
/**
 * Creates sorting order function.
 *
 * @param order - Order.
 * @returns Sorting order function.
 */
function sortingOrder(order) {
    return node => {
        var _a, _b;
        switch (node.type) {
            case AST_NODE_TYPES.ExportAllDeclaration:
                return buildResult(StatementType.ExportAllDeclaration, `${node.source.value}\u0002${node.exportKind}`);
            case AST_NODE_TYPES.ExportDefaultDeclaration:
                return buildResult(StatementType.ExportDefaultDeclaration);
            case AST_NODE_TYPES.ExportNamedDeclaration:
                if (node.declaration)
                    switch (node.declaration.type) {
                        case AST_NODE_TYPES.FunctionDeclaration:
                        case AST_NODE_TYPES.TSDeclareFunction:
                            assert.not.empty(node.declaration.id, "Expecting node ID");
                            return buildResult(StatementType.ExportFunctionDeclaration, node.declaration.id.name);
                        case AST_NODE_TYPES.TSInterfaceDeclaration:
                        case AST_NODE_TYPES.TSTypeAliasDeclaration:
                            return buildResult(StatementType.ExportTypeDeclaration, node.declaration.id.name);
                        default:
                            return buildResult(StatementType.ExportUnknown);
                    }
                return buildResult(StatementType.ExportDeclaration, node.source ? `${node.source.value}\u0002${node.exportKind}` : "");
            case AST_NODE_TYPES.ExpressionStatement: {
                const id = getJestTestName(node);
                return is.not.empty(id)
                    ? buildResult(StatementType.JestTest, id)
                    : buildResult(StatementType.Unknown);
            }
            case AST_NODE_TYPES.FunctionDeclaration:
            case AST_NODE_TYPES.TSDeclareFunction:
                assert.not.empty(node.id, "Expecting node ID");
                return buildResult(StatementType.FunctionDeclaration, node.id.name);
            case AST_NODE_TYPES.ImportDeclaration:
                return buildResult(StatementType.ImportDeclaration);
            case AST_NODE_TYPES.TSInterfaceDeclaration:
            case AST_NODE_TYPES.TSTypeAliasDeclaration:
                return buildResult(StatementType.TypeDeclaration, node.id.name);
            case AST_NODE_TYPES.TSModuleDeclaration:
                if ((_a = node.declare) !== null && _a !== void 0 ? _a : false)
                    return ((_b = node.global) !== null && _b !== void 0 ? _b : false)
                        ? buildResult(StatementType.DeclareGlobal)
                        : buildResult(StatementType.Declare, utils.nodeText(node.id, "?"));
                return buildResult(StatementType.Unknown);
            default:
                return buildResult(StatementType.Unknown);
        }
        function buildResult(type, id = "?") {
            const order1 = 1000000 + order.indexOf(type);
            const order2 = id;
            const order3 = 1000000 + node.range[0];
            return `${order1}\u0001${order2}\u0001${order3}`;
        }
    };
}
//# sourceMappingURL=sort-statements.js.map