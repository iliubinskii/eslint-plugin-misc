"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCheck = void 0;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const tsutils = tslib_1.__importStar(require("tsutils"));
const utils_1 = require("@typescript-eslint/utils");
const functions_1 = require("@skylib/functions");
const types_1 = require("./types");
class TypeCheck {
    /**
     * Creates class instance.
     *
     * @param context - Context.
     */
    constructor(context) {
        Object.defineProperty(this, "checker", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Checks if type is an object.
         *
         * @param type - Type.
         * @returns _True_ if type is an object, _false_ otherwise.
         */
        Object.defineProperty(this, "isObjectType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (type) => tsutils.isObjectType(type)
        });
        /**
         * Checks if type is safe boolean condition.
         *
         * @param type - Type.
         * @returns _True_ if type is safe boolean condition, _false_ otherwise.
         */
        Object.defineProperty(this, "isSafeBooleanCondition", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (type) => {
                if (safeBoolean.has(type.getFlags()))
                    return true;
                if (tsutils.isUnionType(type)) {
                    const parts = tsutils.unionTypeParts(type);
                    if (parts.length === 2) {
                        if (parts.some(part => tsutils.isBooleanLiteralType(part, true)) &&
                            parts.some(part => tsutils.isBooleanLiteralType(part, false)))
                            return true;
                        if (parts.some(part => tsutils.isBooleanLiteralType(part, true)) &&
                            parts.some(part => part.getFlags() === ts.TypeFlags.Undefined))
                            return true;
                        if (parts.some(part => tsutils.isObjectType(part)) &&
                            parts.some(part => part.getFlags() === ts.TypeFlags.Undefined))
                            return true;
                        if (parts.some(part => safeBooleanWithUndefined.has(part.getFlags())) &&
                            parts.some(part => part.getFlags() === ts.TypeFlags.Undefined))
                            return true;
                    }
                }
                return false;
            }
        });
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "toTsNode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const parser = utils_1.ESLintUtils.getParserServices(context);
        // eslint-disable-next-line @skylib/max-identifier-blocks -- Wait for @skylib/eslint-plugin update
        const { esTreeNodeToTSNodeMap, program } = parser;
        functions_1.assert.toBeTrue(tsutils.isStrictCompilerOptionEnabled(program.getCompilerOptions(), "strictNullChecks"), 'Expecting "strictNullChecks" compiler option to be enabled');
        this.checker = program.getTypeChecker();
        this.code = context.getSourceCode().getText();
        this.toTsNode = esTreeNodeToTSNodeMap.get.bind(esTreeNodeToTSNodeMap);
    }
    /**
     * Extracts call signatures from node.
     *
     * @param node - Node.
     * @returns Call signatures.
     */
    getCallSignatures(node) {
        const type = this.getType(node);
        return this.checker.getSignaturesOfType(type, ts.SignatureKind.Call);
    }
    /**
     * Extracts constructor type from node.
     *
     * @param node - Node.
     * @returns Constructor type.
     */
    getConstructorType(node) {
        const tsNode = this.toTsNode(node);
        return tsutils.isConstructorDeclaration(tsNode)
            ? tsutils.getConstructorTypeOfClassLikeDeclaration(tsNode.parent, this.checker)
            : undefined;
    }
    /**
     * Determines contextual type of the node.
     *
     * @param node - Node.
     * @returns Contextual type.
     */
    getContextualType(node) {
        const tsNode = this.toTsNode(node);
        assertExpression(tsNode, "Expecting expression");
        return this.checker.getContextualType(tsNode);
    }
    /**
     * Extracts index info from type.
     *
     * @param type - Type.
     * @param kind - Index kind.
     * @returns Index info.
     */
    getIndexInfo(type, kind) {
        return this.checker.getIndexInfoOfType(type, kind);
    }
    /**
     * Extracts return type from signature.
     *
     * @param signature - Signature.
     * @returns Return type.
     */
    getReturnType(signature) {
        return this.checker.getReturnTypeOfSignature(signature);
    }
    /**
     * Finds symbol at node location.
     *
     * @param node - Node.
     * @returns Symbol.
     */
    getSymbol(node) {
        const tsNode = this.toTsNode(node);
        return this.checker.getSymbolAtLocation(tsNode);
    }
    /**
     * Determines type of the node.
     *
     * @param node - Node.
     * @returns Type.
     */
    getType(node) {
        const tsNode = this.toTsNode(node);
        return this.checker.getTypeAtLocation(tsNode);
    }
    /**
     * Checks if mixed has doc comment.
     *
     * @param mixed - Mixed.
     * @returns _True_ if mixed has doc comment, _false_ otherwise.
     */
    hasDocComment(mixed) {
        return mixed.getDocumentationComment(this.checker).length > 0;
    }
    /**
     * Checks if node is an array or a tuple.
     *
     * @param node - Node.
     * @returns _True_ if node is an array or a tuple, _false_ otherwise.
     */
    isArrayOrTuple(node) {
        return this.isArrayOrTupleType(this.getType(node));
    }
    /**
     * Checks if type is an array or a tuple.
     *
     * @param type - Type.
     * @returns _True_ if type is an array or a tuple, _false_ otherwise.
     */
    // eslint-disable-next-line @skylib/max-identifier-blocks -- Ok
    isArrayOrTupleType(type) {
        return this.checker.isArrayType(type) || this.checker.isTupleType(type);
    }
    /**
     * Checks if property is readonly in type.
     *
     * @param property - Property.
     * @param type - Type.
     * @returns _True_ if property is readonly in type, _false_ otherwise.
     */
    isReadonlyProperty(property, type) {
        return tsutils.isPropertyReadonlyInType(type, property.getEscapedName(), this.checker);
    }
    /**
     * Checks if type contains type group.
     *
     * @param type - Type.
     * @param expected - Expected type group.
     * @returns _True_ if type contains type group, _false_ otherwise.
     */
    typeHas(type, expected) {
        return expected
            ? this.typeIs(type, expected) ||
                (type.isUnion() &&
                    type.types.some(subtype => this.typeIs(subtype, expected)))
            : true;
    }
    /**
     * Checks if type contains none of type groups.
     *
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type contains none of type groups, _false_ otherwise.
     */
    typeHasNoneOf(type, expected) {
        return expected ? expected.every(x => !this.typeHas(type, x)) : true;
    }
    /**
     * Checks if type contains one of type groups.
     *
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type contains one of type groups, _false_ otherwise.
     */
    typeHasOneOf(type, expected) {
        return expected ? expected.some(x => this.typeHas(type, x)) : true;
    }
    /**
     * Checks if type belongs to type group.
     *
     * @param type - Type.
     * @param expected - Expected type group.
     * @returns _True_ if type belongs to type group, _false_ otherwise.
     */
    // eslint-disable-next-line complexity -- Wait for @skylib/config update
    typeIs(type, expected) {
        if (expected)
            switch (expected) {
                case types_1.TypeGroup.any:
                    return checkTypeFlags(type, ts.TypeFlags.Any);
                case types_1.TypeGroup.array:
                    return (checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) && this.checker.isArrayType(type));
                case types_1.TypeGroup.boolean:
                    return checkTypeFlags(type, ts.TypeFlags.Boolean, ts.TypeFlags.BooleanLike, ts.TypeFlags.BooleanLiteral);
                case types_1.TypeGroup.complex: {
                    if (this.checker.isArrayType(type) ||
                        this.checker.isTupleType(type)) {
                        const subtypes = type.typeArguments;
                        functions_1.assert.not.empty(subtypes, "Missing type arguments");
                        return subtypes.some(subtype => this.typeIs(subtype, types_1.TypeGroup.complex));
                    }
                    if (type.isUnionOrIntersection())
                        return type.types.some(subtype => this.typeIs(subtype, types_1.TypeGroup.complex));
                    const symbol = type.getSymbol();
                    return symbol && symbol.name.startsWith("__")
                        ? type.getProperties().length > 0 &&
                            checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object)
                        : false;
                }
                case types_1.TypeGroup.function:
                    return (checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) && type.getCallSignatures().length > 0);
                case types_1.TypeGroup.never:
                    return checkTypeFlags(type, ts.TypeFlags.Never);
                case types_1.TypeGroup.null:
                    return checkTypeFlags(type, ts.TypeFlags.Null);
                case types_1.TypeGroup.number:
                    return checkTypeFlags(type, ts.TypeFlags.Number, ts.TypeFlags.NumberLike, ts.TypeFlags.NumberLiteral);
                case types_1.TypeGroup.object:
                    return (checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        !this.typeIs(type, types_1.TypeGroup.array) &&
                        !this.typeIs(type, types_1.TypeGroup.function) &&
                        !this.typeIs(type, types_1.TypeGroup.tuple));
                case types_1.TypeGroup.parameter:
                    return type.isTypeParameter();
                case types_1.TypeGroup.readonly:
                    return type
                        .getProperties()
                        .some(property => tsutils.isPropertyReadonlyInType(type, property.getEscapedName(), this.checker));
                case types_1.TypeGroup.string:
                    return checkTypeFlags(type, ts.TypeFlags.String, ts.TypeFlags.StringLike, ts.TypeFlags.StringLiteral);
                case types_1.TypeGroup.symbol:
                    return checkTypeFlags(type, ts.TypeFlags.ESSymbol, ts.TypeFlags.ESSymbolLike, ts.TypeFlags.UniqueESSymbol);
                case types_1.TypeGroup.tuple:
                    return (checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) && this.checker.isTupleType(type));
                case types_1.TypeGroup.undefined:
                    return checkTypeFlags(type, ts.TypeFlags.Undefined);
                case types_1.TypeGroup.unknown:
                    return checkTypeFlags(type, ts.TypeFlags.Unknown);
            }
        return true;
    }
    /**
     * Checks if type belongs to none of type groups.
     *
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type belongs to none of type groups, _false_ otherwise.
     */
    typeIsNoneOf(type, expected) {
        return expected ? expected.every(x => !this.typeIs(type, x)) : true;
    }
    /**
     * Checks if type belongs to one of type groups.
     *
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type belongs to one of type groups, _false_ otherwise.
     */
    typeIsOneOf(type, expected) {
        return expected ? expected.some(x => this.typeIs(type, x)) : true;
    }
    /**
     * Extracts type parts from node.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    typeParts(node) {
        return node.type === utils_1.AST_NODE_TYPES.UnaryExpression &&
            node.operator === "typeof"
            ? this.typePartsTypeof(node)
            : this.typePartsNoTypeof(node);
    }
    /**
     * Extracts type parts from node.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    typePartsNoTypeof(node) {
        return recurs(this.checker.getTypeAtLocation(this.toTsNode(node)));
        function recurs(type) {
            if (type.isNumberLiteral())
                return [type.value];
            if (type.isStringLiteral())
                return [type.value];
            if (type.isUnion())
                return tsutils.unionTypeParts(type).flatMap(part => recurs(part));
            return [type];
        }
    }
    /**
     * Extracts type parts from node.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    typePartsTypeof(node) {
        return recurs(this.checker.getTypeAtLocation(this.toTsNode(node.argument)));
        function recurs(type) {
            if (type.getCallSignatures().length ||
                type.getConstructSignatures().length)
                return ["function"];
            if (type.isUnion())
                return tsutils.unionTypeParts(type).flatMap(part => recurs(part));
            switch (functions_1.as.byGuard(type.flags, isExpectedFlags)) {
                case ts.TypeFlags.BigInt:
                case ts.TypeFlags.BigIntLiteral:
                    return ["bigint"];
                case ts.TypeFlags.BooleanLiteral:
                    return ["boolean"];
                case ts.TypeFlags.Number:
                case ts.TypeFlags.NumberLiteral:
                    return ["number"];
                case ts.TypeFlags.Null:
                case ts.TypeFlags.Object:
                    return ["object"];
                case ts.TypeFlags.String:
                case ts.TypeFlags.StringLiteral:
                    return ["string"];
                case ts.TypeFlags.ESSymbol:
                case ts.TypeFlags.UniqueESSymbol:
                    return ["symbol"];
                case ts.TypeFlags.Undefined:
                case ts.TypeFlags.Void:
                    return ["undefined"];
            }
        }
    }
}
exports.TypeCheck = TypeCheck;
const isExpectedFlags = functions_1.is.factory(functions_1.is.enumeration, {
    [ts.TypeFlags.BigInt]: ts.TypeFlags.BigInt,
    [ts.TypeFlags.BigIntLiteral]: ts.TypeFlags.BigIntLiteral,
    [ts.TypeFlags.BooleanLiteral]: ts.TypeFlags.BooleanLiteral,
    [ts.TypeFlags.ESSymbol]: ts.TypeFlags.ESSymbol,
    [ts.TypeFlags.Null]: ts.TypeFlags.Null,
    [ts.TypeFlags.Number]: ts.TypeFlags.Number,
    [ts.TypeFlags.NumberLiteral]: ts.TypeFlags.NumberLiteral,
    [ts.TypeFlags.Object]: ts.TypeFlags.Object,
    [ts.TypeFlags.String]: ts.TypeFlags.String,
    [ts.TypeFlags.StringLiteral]: ts.TypeFlags.StringLiteral,
    [ts.TypeFlags.Undefined]: ts.TypeFlags.Undefined,
    [ts.TypeFlags.UniqueESSymbol]: ts.TypeFlags.UniqueESSymbol,
    [ts.TypeFlags.Void]: ts.TypeFlags.Void
});
const safeBoolean = new functions_1.ReadonlySet([
    ts.TypeFlags.BigInt,
    ts.TypeFlags.BigIntLiteral,
    ts.TypeFlags.Boolean,
    ts.TypeFlags.BooleanLiteral,
    ts.TypeFlags.Number,
    ts.TypeFlags.NumberLiteral,
    ts.TypeFlags.String,
    ts.TypeFlags.StringLiteral
]);
const safeBooleanWithUndefined = new functions_1.ReadonlySet([
    ts.TypeFlags.ESSymbol,
    ts.TypeFlags.Object,
    ts.TypeFlags.NonPrimitive,
    ts.TypeFlags.UniqueESSymbol
]);
/**
 * Asserts node to be expression.
 *
 * @param tsNode - Typescript node.
 * @param error - Error.
 */
function assertExpression(tsNode, error) {
    functions_1.assert.toBeTrue(tsutils.isExpression(tsNode), error);
}
/**
 * Checks type flags.
 *
 * @param type - Type.
 * @param flags - Flags.
 * @returns _True_ if type has one of given flags, _false_ otherwise.
 */
function checkTypeFlags(type, ...flags) {
    if (type.isTypeParameter()) {
        const constraint = type.getConstraint();
        if (functions_1.is.not.empty(constraint))
            type = constraint;
        else
            return flags.includes(ts.TypeFlags.Unknown);
    }
    return (flags.includes(type.getFlags()) ||
        (type.isUnion() &&
            type.types.every(subtype => flags.includes(subtype.getFlags()))));
}
//# sourceMappingURL=TypeCheck.js.map