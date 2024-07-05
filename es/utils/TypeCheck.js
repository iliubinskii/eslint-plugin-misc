import * as ts from "typescript";
import * as tsutils from "tsutils";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import { ReadonlySet, as, assert, is, typedef } from "typescript-misc";
import { TypeGroup } from "./types";
export class TypeCheck {
    checker;
    /**
     * Creates class instance.
     * @param context - Context.
     */
    constructor(context) {
        const parser = ESLintUtils.getParserServices(context);
        const { esTreeNodeToTSNodeMap, program } = parser;
        assert.toBeTrue(tsutils.isStrictCompilerOptionEnabled(program.getCompilerOptions(), "strictNullChecks"), 'Expecting "strictNullChecks" compiler option to be enabled');
        this.checker = program.getTypeChecker();
        this.code = context.getSourceCode().getText();
        this.toTsNode = esTreeNodeToTSNodeMap.get.bind(esTreeNodeToTSNodeMap);
    }
    /**
     * Extracts call signatures from node.
     * @param node - Node.
     * @returns Call signatures.
     */
    getCallSignatures(node) {
        const type = this.getType(node);
        return this.checker.getSignaturesOfType(type, ts.SignatureKind.Call);
    }
    /**
     * Extracts constructor type from node.
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
     * @param node - Node.
     * @returns Contextual type.
     */
    getContextualType(node) {
        const tsNode = this.toTsNode(node);
        return tsutils.isExpression(tsNode)
            ? this.checker.getContextualType(tsNode)
            : undefined;
    }
    /**
     * Extracts index info from type.
     * @param type - Type.
     * @param kind - Index kind.
     * @returns Index info.
     */
    getIndexInfo(type, kind) {
        return this.checker.getIndexInfoOfType(type, kind);
    }
    /**
     * Extracts return type from signature.
     * @param signature - Signature.
     * @returns Return type.
     */
    getReturnType(signature) {
        return this.checker.getReturnTypeOfSignature(signature);
    }
    /**
     * Finds symbol at node location.
     * @param node - Node.
     * @returns Symbol.
     */
    getSymbol(node) {
        const tsNode = this.toTsNode(node);
        return this.checker.getSymbolAtLocation(tsNode);
    }
    /**
     * Returns node type.
     * @param node - Node.
     * @returns Type.
     */
    getType(node) {
        const tsNode = this.toTsNode(node);
        return this.checker.getTypeAtLocation(tsNode);
    }
    /**
     * Checks if mixed has doc comment.
     * @param mixed - Mixed.
     * @returns _True_ if mixed has doc comment, _false_ otherwise.
     */
    hasDocComment(mixed) {
        return mixed.getDocumentationComment(this.checker).length > 0;
    }
    /**
     * Checks if node is an array or a tuple.
     * @param node - Node.
     * @returns _True_ if node is an array or a tuple, _false_ otherwise.
     */
    isArrayOrTuple(node) {
        return this.isArrayOrTupleType(this.getType(node));
    }
    /**
     * Checks if type is an array or a tuple.
     * @param type - Type.
     * @returns _True_ if type is an array or a tuple, _false_ otherwise.
     */
    isArrayOrTupleType(type) {
        return this.checker.isArrayType(type) || this.checker.isTupleType(type);
    }
    /**
     * Checks if type is an array.
     * @param type - Type.
     * @returns _True_ if type is an array, _false_ otherwise.
     */
    isArrayType(type) {
        return this.checker.isArrayType(type);
    }
    /**
     * Checks if type is enum literal.
     * @param this - No this.
     * @param type - Type.
     * @returns _True_ if type is enum literal, _false_ otherwise.
     */
    isEnumLiteralType(type) {
        // eslint-disable-next-line no-bitwise -- Ok
        return (type.getFlags() & ts.TypeFlags.EnumLiteral) !== 0;
    }
    /**
     * Checks if type is an object.
     * @param this - No this.
     * @param type - Type.
     * @returns _True_ if type is an object, _false_ otherwise.
     */
    isObjectType(type) {
        return tsutils.isObjectType(type);
    }
    /**
     * Checks if property is readonly in type.
     * @param property - Property.
     * @param type - Type.
     * @returns _True_ if property is readonly in type, _false_ otherwise.
     */
    isReadonlyProperty(property, type) {
        return tsutils.isPropertyReadonlyInType(type, property.getEscapedName(), this.checker);
    }
    /**
     * Checks if type is safe boolean condition.
     * @param type - Type.
     * @returns _True_ if type is safe boolean condition, _false_ otherwise.
     */
    isSafeBooleanCondition(type) {
        if (safeBoolean.has(type.getFlags()))
            return true;
        if (tsutils.isUnionType(type)) {
            const parts = tsutils.unionTypeParts(type);
            if (parts.every(part => tsutils.isBooleanLiteralType(part, true) ||
                tsutils.isBooleanLiteralType(part, false)) ||
                parts.every(part => tsutils.isBooleanLiteralType(part, true) ||
                    this.isUndefinedType(part)) ||
                parts.every(part => this.isObjectType(part) || this.isUndefinedType(part)) ||
                parts.every(part => safeBooleanWithUndefined.has(part.getFlags()) ||
                    this.isUndefinedType(part)))
                return true;
        }
        return false;
    }
    /**
     * Checks if type is an array or a tuple.
     * @param type - Type.
     * @returns _True_ if type is an array or a tuple, _false_ otherwise.
     */
    isTupleType(type) {
        return this.checker.isTupleType(type);
    }
    /**
     * Checks if type is undefined.
     * @param this - No this.
     * @param type - Type.
     * @returns _True_ if type is undefined, _false_ otherwise.
     */
    isUndefinedType(type) {
        // eslint-disable-next-line no-bitwise -- Ok
        return (type.getFlags() & ts.TypeFlags.Undefined) !== 0;
    }
    /**
     * Checks if type contains type group.
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
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type contains none of type groups, _false_ otherwise.
     */
    typeHasNoneOf(type, expected) {
        return expected ? expected.every(x => !this.typeHas(type, x)) : true;
    }
    /**
     * Checks if type contains one of type groups.
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type contains one of type groups, _false_ otherwise.
     */
    typeHasOneOf(type, expected) {
        return expected ? expected.some(x => this.typeHas(type, x)) : true;
    }
    /**
     * Checks if type belongs to type group.
     * @param type - Type.
     * @param expected - Expected type group.
     * @returns _True_ if type belongs to type group, _false_ otherwise.
     */
    typeIs(type, expected) {
        if (expected)
            switch (expected) {
                case TypeGroup.any: {
                    return checkTypeFlags(type, ts.TypeFlags.Any);
                }
                case TypeGroup.array: {
                    return (checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) && this.isArrayType(type));
                }
                case TypeGroup.arrayOrTuple: {
                    return (checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) && this.isArrayOrTupleType(type));
                }
                case TypeGroup.boolean: {
                    return checkTypeFlags(type, ts.TypeFlags.Boolean, ts.TypeFlags.BooleanLike, ts.TypeFlags.BooleanLiteral);
                }
                case TypeGroup.complex: {
                    if (this.isArrayOrTupleType(type)) {
                        const subtypes = type.typeArguments;
                        assert.not.empty(subtypes, "Missing type arguments");
                        return subtypes.some(subtype => this.typeIs(subtype, TypeGroup.complex));
                    }
                    if (type.isUnionOrIntersection())
                        return type.types.some(subtype => this.typeIs(subtype, TypeGroup.complex));
                    const symbol = type.getSymbol();
                    return symbol && symbol.name.startsWith("__")
                        ? type.getProperties().length > 0 &&
                            checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object)
                        : false;
                }
                case TypeGroup.function: {
                    return (checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) && type.getCallSignatures().length > 0);
                }
                case TypeGroup.never: {
                    return checkTypeFlags(type, ts.TypeFlags.Never);
                }
                case TypeGroup.null: {
                    return checkTypeFlags(type, ts.TypeFlags.Null);
                }
                case TypeGroup.number: {
                    return checkTypeFlags(type, ts.TypeFlags.Number, ts.TypeFlags.NumberLike, ts.TypeFlags.NumberLiteral);
                }
                case TypeGroup.object: {
                    return (checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) &&
                        !this.typeIs(type, TypeGroup.arrayOrTuple) &&
                        !this.typeIs(type, TypeGroup.function));
                }
                case TypeGroup.parameter: {
                    return type.isTypeParameter();
                }
                case TypeGroup.readonly: {
                    return type
                        .getProperties()
                        .some(property => tsutils.isPropertyReadonlyInType(type, property.getEscapedName(), this.checker));
                }
                case TypeGroup.string: {
                    return checkTypeFlags(type, ts.TypeFlags.String, ts.TypeFlags.StringLike, ts.TypeFlags.StringLiteral);
                }
                case TypeGroup.symbol: {
                    return checkTypeFlags(type, ts.TypeFlags.ESSymbol, ts.TypeFlags.ESSymbolLike, ts.TypeFlags.UniqueESSymbol);
                }
                case TypeGroup.tuple: {
                    return (checkTypeFlags(type, ts.TypeFlags.NonPrimitive, ts.TypeFlags.Object) && this.isTupleType(type));
                }
                case TypeGroup.undefined: {
                    return checkTypeFlags(type, ts.TypeFlags.Undefined);
                }
                case TypeGroup.unknown: {
                    return checkTypeFlags(type, ts.TypeFlags.Unknown);
                }
            }
        return true;
    }
    /**
     * Checks if type belongs to none of type groups.
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type belongs to none of type groups, _false_ otherwise.
     */
    typeIsNoneOf(type, expected) {
        return expected ? expected.every(x => !this.typeIs(type, x)) : true;
    }
    /**
     * Checks if type belongs to one of type groups.
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type belongs to one of type groups, _false_ otherwise.
     */
    typeIsOneOf(type, expected) {
        return expected ? expected.some(x => this.typeIs(type, x)) : true;
    }
    /**
     * Extracts type parts from node.
     * @param node - Node.
     * @returns Type parts.
     */
    typeParts(node) {
        return node.type === AST_NODE_TYPES.UnaryExpression &&
            node.operator === "typeof"
            ? this.typePartsTypeof(node)
            : this.typePartsNoTypeof(node);
    }
    code;
    toTsNode;
    /**
     * Extracts type parts from node.
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
     * @param node - Node.
     * @returns Type parts.
     */
    typePartsTypeof(node) {
        return recurs(this.checker.getTypeAtLocation(this.toTsNode(node.argument)));
        function recurs(type) {
            if (type.getCallSignatures().length > 0 ||
                type.getConstructSignatures().length > 0)
                return ["function"];
            if (type.isUnion())
                return tsutils.unionTypeParts(type).flatMap(part => recurs(part));
            switch (as.byGuard(type.flags, isExpectedFlags)) {
                case ts.TypeFlags.BigInt:
                case ts.TypeFlags.BigIntLiteral: {
                    return ["bigint"];
                }
                case ts.TypeFlags.BooleanLiteral: {
                    return ["boolean"];
                }
                case ts.TypeFlags.Number:
                case ts.TypeFlags.NumberLiteral: {
                    return ["number"];
                }
                case ts.TypeFlags.Null:
                case ts.TypeFlags.Object: {
                    return ["object"];
                }
                case ts.TypeFlags.String:
                case ts.TypeFlags.StringLiteral: {
                    return ["string"];
                }
                case ts.TypeFlags.ESSymbol:
                case ts.TypeFlags.UniqueESSymbol: {
                    return ["symbol"];
                }
                case ts.TypeFlags.Undefined:
                case ts.TypeFlags.Void: {
                    return ["undefined"];
                }
            }
        }
    }
}
const expectedFlags = new ReadonlySet([
    ts.TypeFlags.BigInt,
    ts.TypeFlags.BigIntLiteral,
    ts.TypeFlags.BooleanLiteral,
    ts.TypeFlags.ESSymbol,
    ts.TypeFlags.Null,
    ts.TypeFlags.Number,
    ts.TypeFlags.NumberLiteral,
    ts.TypeFlags.Object,
    ts.TypeFlags.String,
    ts.TypeFlags.StringLiteral,
    ts.TypeFlags.Undefined,
    ts.TypeFlags.UniqueESSymbol,
    ts.TypeFlags.Void
]);
const safeBoolean = new ReadonlySet([
    ts.TypeFlags.BigInt,
    ts.TypeFlags.BigIntLiteral,
    ts.TypeFlags.Boolean,
    ts.TypeFlags.BooleanLiteral,
    ts.TypeFlags.Number,
    ts.TypeFlags.NumberLiteral,
    ts.TypeFlags.String,
    ts.TypeFlags.StringLiteral
]);
const safeBooleanWithUndefined = new ReadonlySet([
    ts.TypeFlags.ESSymbol,
    ts.TypeFlags.Object,
    ts.TypeFlags.NonPrimitive,
    ts.TypeFlags.UniqueESSymbol
]);
/**
 * Checks type flags.
 * @param type - Type.
 * @param flags - Flags.
 * @returns _True_ if type has one of given flags, _false_ otherwise.
 */
function checkTypeFlags(type, ...flags) {
    if (type.isTypeParameter()) {
        const constraint = type.getConstraint();
        if (is.empty(constraint))
            return flags.includes(ts.TypeFlags.Unknown);
        type = constraint;
    }
    return (flags.includes(type.getFlags()) ||
        (type.isUnion() &&
            type.types.every(subtype => flags.includes(subtype.getFlags()))));
}
/**
 * Checks if value type is ExpectedFlags.
 * @param value - Value.
 * @returns _True_ if value type is ExpectedFlags, _false_ otherwise.
 */
function isExpectedFlags(value) {
    return typedef(expectedFlags).has(value);
}
//# sourceMappingURL=TypeCheck.js.map