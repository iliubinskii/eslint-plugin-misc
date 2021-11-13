import * as ts from "typescript";
import type { ParserServices, TSESTree } from "@typescript-eslint/utils";
import type { Signatures, TypeParts } from "./TypeCheck.internal";
import type { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { TypeGroup } from "./types";
import type { TypeGroups } from "./types";
import type { unknowns } from "@skylib/functions";
export declare class TypeCheck {
    readonly checker: ts.TypeChecker;
    /**
     * Creates class instance.
     *
     * @param context - Context.
     */
    constructor(context: RuleContext<never, unknowns>);
    /**
     * Extracts call signatures from node.
     *
     * @param node - Node.
     * @returns Call signatures.
     */
    getCallSignatures(node: TSESTree.Node): Signatures;
    /**
     * Extracts constructor type from node.
     *
     * @param node - Node.
     * @returns Constructor type.
     */
    getConstructorType(node: TSESTree.Node): ts.Type | undefined;
    /**
     * Determines contextual type of the node.
     *
     * @param node - Node.
     * @returns Contextual type.
     */
    getContextualType(node: TSESTree.Node): ts.Type | undefined;
    /**
     * Extracts index info from type.
     *
     * @param type - Type.
     * @param kind - Index kind.
     * @returns Index info.
     */
    getIndexInfo(type: ts.Type, kind: ts.IndexKind): ts.IndexInfo | undefined;
    /**
     * Extracts return type from signature.
     *
     * @param signature - Signature.
     * @returns Return type.
     */
    getReturnType(signature: ts.Signature): ts.Type;
    /**
     * Finds symbol at node location.
     *
     * @param node - Node.
     * @returns Symbol.
     */
    getSymbol(node: TSESTree.Node): ts.Symbol | undefined;
    /**
     * Determines type of the node.
     *
     * @param node - Node.
     * @returns Type.
     */
    getType(node: TSESTree.Node): ts.Type;
    /**
     * Checks if mixed has doc comment.
     *
     * @param mixed - Mixed.
     * @returns _True_ if mixed has doc comment, _false_ otherwise.
     */
    hasDocComment(mixed: ts.Signature | ts.Symbol): boolean;
    /**
     * Checks if node is an array or a tuple.
     *
     * @param node - Node.
     * @returns _True_ if node is an array or a tuple, _false_ otherwise.
     */
    isArrayOrTuple(node: TSESTree.Node): boolean;
    /**
     * Checks if type is an array or a tuple.
     *
     * @param type - Type.
     * @returns _True_ if type is an array or a tuple, _false_ otherwise.
     */
    isArrayOrTupleType(type: ts.Type): type is ts.TupleTypeReference | ts.TypeReference;
    /**
     * Checks if type is an object.
     *
     * @param type - Type.
     * @returns _True_ if type is an object, _false_ otherwise.
     */
    readonly isObjectType: (type: ts.Type) => type is ts.ObjectType;
    /**
     * Checks if property is readonly in type.
     *
     * @param property - Property.
     * @param type - Type.
     * @returns _True_ if property is readonly in type, _false_ otherwise.
     */
    isReadonlyProperty(property: ts.Symbol, type: ts.Type): boolean;
    /**
     * Checks if type is safe boolean condition.
     *
     * @param type - Type.
     * @returns _True_ if type is safe boolean condition, _false_ otherwise.
     */
    readonly isSafeBooleanCondition: (type: ts.Type) => boolean;
    /**
     * Checks if type contains type group.
     *
     * @param type - Type.
     * @param expected - Expected type group.
     * @returns _True_ if type contains type group, _false_ otherwise.
     */
    typeHas(type: ts.Type, expected?: TypeGroup): boolean;
    /**
     * Checks if type contains none of type groups.
     *
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type contains none of type groups, _false_ otherwise.
     */
    typeHasNoneOf(type: ts.Type, expected?: TypeGroups): boolean;
    /**
     * Checks if type contains one of type groups.
     *
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type contains one of type groups, _false_ otherwise.
     */
    typeHasOneOf(type: ts.Type, expected?: TypeGroups): boolean;
    /**
     * Checks if type belongs to type group.
     *
     * @param type - Type.
     * @param expected - Expected type group.
     * @returns _True_ if type belongs to type group, _false_ otherwise.
     */
    typeIs(type: ts.Type, expected: TypeGroup | undefined): boolean;
    /**
     * Checks if type belongs to none of type groups.
     *
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type belongs to none of type groups, _false_ otherwise.
     */
    typeIsNoneOf(type: ts.Type, expected?: TypeGroups): boolean;
    /**
     * Checks if type belongs to one of type groups.
     *
     * @param type - Type.
     * @param expected - Expected type groups.
     * @returns _True_ if type belongs to one of type groups, _false_ otherwise.
     */
    typeIsOneOf(type: ts.Type, expected?: TypeGroups): boolean;
    /**
     * Extracts type parts from node.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    typeParts(node: TSESTree.Node): TypeParts;
    protected readonly code: string;
    protected readonly toTsNode: ParserServices["esTreeNodeToTSNodeMap"]["get"];
    /**
     * Extracts type parts from node.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    protected typePartsNoTypeof(node: TSESTree.Node): TypeParts;
    /**
     * Extracts type parts from node.
     *
     * @param node - Node.
     * @returns Type parts.
     */
    protected typePartsTypeof(node: TSESTree.UnaryExpression): TypeParts;
}
//# sourceMappingURL=TypeCheck.d.ts.map