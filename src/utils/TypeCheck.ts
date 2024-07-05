import * as ts from "typescript";
import * as tsutils from "tsutils";
import { AST_NODE_TYPES, ESLintUtils } from "@typescript-eslint/utils";
import type { NumStr, unknowns } from "typescript-misc";
import type { ParserServices, TSESTree } from "@typescript-eslint/utils";
import { ReadonlySet, as, assert, is, typedef } from "typescript-misc";
import type { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { TypeGroup } from "./types";
import type { TypeGroups } from "./types";

export class TypeCheck {
  public readonly checker: ts.TypeChecker;

  /**
   * Creates class instance.
   * @param context - Context.
   */
  public constructor(context: RuleContext<never, unknowns>) {
    const parser = ESLintUtils.getParserServices(context);

    const { esTreeNodeToTSNodeMap, program } = parser;

    assert.toBeTrue(
      tsutils.isStrictCompilerOptionEnabled(
        program.getCompilerOptions(),
        "strictNullChecks"
      ),
      'Expecting "strictNullChecks" compiler option to be enabled'
    );
    this.checker = program.getTypeChecker();
    this.code = context.getSourceCode().getText();
    this.toTsNode = esTreeNodeToTSNodeMap.get.bind(esTreeNodeToTSNodeMap);
  }

  /**
   * Extracts call signatures from node.
   * @param node - Node.
   * @returns Call signatures.
   */
  public getCallSignatures(node: TSESTree.Node): Signatures {
    const type = this.getType(node);

    return this.checker.getSignaturesOfType(type, ts.SignatureKind.Call);
  }

  /**
   * Extracts constructor type from node.
   * @param node - Node.
   * @returns Constructor type.
   */
  public getConstructorType(node: TSESTree.Node): ts.Type | undefined {
    const tsNode = this.toTsNode(node);

    return tsutils.isConstructorDeclaration(tsNode)
      ? tsutils.getConstructorTypeOfClassLikeDeclaration(
          tsNode.parent,
          this.checker
        )
      : undefined;
  }

  /**
   * Determines contextual type of the node.
   * @param node - Node.
   * @returns Contextual type.
   */
  public getContextualType(node: TSESTree.Node): ts.Type | undefined {
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
  public getIndexInfo(
    type: ts.Type,
    kind: ts.IndexKind
  ): ts.IndexInfo | undefined {
    return this.checker.getIndexInfoOfType(type, kind);
  }

  /**
   * Extracts return type from signature.
   * @param signature - Signature.
   * @returns Return type.
   */
  public getReturnType(signature: ts.Signature): ts.Type {
    return this.checker.getReturnTypeOfSignature(signature);
  }

  /**
   * Finds symbol at node location.
   * @param node - Node.
   * @returns Symbol.
   */
  public getSymbol(node: TSESTree.Node): ts.Symbol | undefined {
    const tsNode = this.toTsNode(node);

    return this.checker.getSymbolAtLocation(tsNode);
  }

  /**
   * Returns node type.
   * @param node - Node.
   * @returns Type.
   */
  public getType(node: TSESTree.Node): ts.Type {
    const tsNode = this.toTsNode(node);

    return this.checker.getTypeAtLocation(tsNode);
  }

  /**
   * Checks if mixed has doc comment.
   * @param mixed - Mixed.
   * @returns _True_ if mixed has doc comment, _false_ otherwise.
   */
  public hasDocComment(mixed: ts.Signature | ts.Symbol): boolean {
    return mixed.getDocumentationComment(this.checker).length > 0;
  }

  /**
   * Checks if node is an array or a tuple.
   * @param node - Node.
   * @returns _True_ if node is an array or a tuple, _false_ otherwise.
   */
  public isArrayOrTuple(node: TSESTree.Node): boolean {
    return this.isArrayOrTupleType(this.getType(node));
  }

  /**
   * Checks if type is an array or a tuple.
   * @param type - Type.
   * @returns _True_ if type is an array or a tuple, _false_ otherwise.
   */
  public isArrayOrTupleType(
    type: ts.Type
  ): type is ts.TupleTypeReference | ts.TypeReference {
    return this.checker.isArrayType(type) || this.checker.isTupleType(type);
  }

  /**
   * Checks if type is an array.
   * @param type - Type.
   * @returns _True_ if type is an array, _false_ otherwise.
   */

  public isArrayType(type: ts.Type): type is ts.TypeReference {
    return this.checker.isArrayType(type);
  }

  /**
   * Checks if type is enum literal.
   * @param this - No this.
   * @param type - Type.
   * @returns _True_ if type is enum literal, _false_ otherwise.
   */
  public isEnumLiteralType(this: void, type: ts.Type): boolean {
    // eslint-disable-next-line no-bitwise -- Ok
    return (type.getFlags() & ts.TypeFlags.EnumLiteral) !== 0;
  }

  /**
   * Checks if type is an object.
   * @param this - No this.
   * @param type - Type.
   * @returns _True_ if type is an object, _false_ otherwise.
   */
  public isObjectType(this: void, type: ts.Type): type is ts.ObjectType {
    return tsutils.isObjectType(type);
  }

  /**
   * Checks if property is readonly in type.
   * @param property - Property.
   * @param type - Type.
   * @returns _True_ if property is readonly in type, _false_ otherwise.
   */
  public isReadonlyProperty(property: ts.Symbol, type: ts.Type): boolean {
    return tsutils.isPropertyReadonlyInType(
      type,
      property.getEscapedName(),
      this.checker
    );
  }

  /**
   * Checks if type is safe boolean condition.
   * @param type - Type.
   * @returns _True_ if type is safe boolean condition, _false_ otherwise.
   */
  public isSafeBooleanCondition(type: ts.Type): boolean {
    if (safeBoolean.has(type.getFlags())) return true;

    if (tsutils.isUnionType(type)) {
      const parts = tsutils.unionTypeParts(type);

      if (
        parts.every(
          part =>
            tsutils.isBooleanLiteralType(part, true) ||
            tsutils.isBooleanLiteralType(part, false)
        ) ||
        parts.every(
          part =>
            tsutils.isBooleanLiteralType(part, true) ||
            this.isUndefinedType(part)
        ) ||
        parts.every(
          part => this.isObjectType(part) || this.isUndefinedType(part)
        ) ||
        parts.every(
          part =>
            safeBooleanWithUndefined.has(part.getFlags()) ||
            this.isUndefinedType(part)
        )
      )
        return true;
    }

    return false;
  }

  /**
   * Checks if type is an array or a tuple.
   * @param type - Type.
   * @returns _True_ if type is an array or a tuple, _false_ otherwise.
   */

  public isTupleType(type: ts.Type): type is ts.TupleTypeReference {
    return this.checker.isTupleType(type);
  }

  /**
   * Checks if type is undefined.
   * @param this - No this.
   * @param type - Type.
   * @returns _True_ if type is undefined, _false_ otherwise.
   */
  public isUndefinedType(this: void, type: ts.Type): boolean {
    // eslint-disable-next-line no-bitwise -- Ok
    return (type.getFlags() & ts.TypeFlags.Undefined) !== 0;
  }

  /**
   * Checks if type contains type group.
   * @param type - Type.
   * @param expected - Expected type group.
   * @returns _True_ if type contains type group, _false_ otherwise.
   */
  public typeHas(type: ts.Type, expected?: TypeGroup): boolean {
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
  public typeHasNoneOf(type: ts.Type, expected?: TypeGroups): boolean {
    return expected ? expected.every(x => !this.typeHas(type, x)) : true;
  }

  /**
   * Checks if type contains one of type groups.
   * @param type - Type.
   * @param expected - Expected type groups.
   * @returns _True_ if type contains one of type groups, _false_ otherwise.
   */
  public typeHasOneOf(type: ts.Type, expected?: TypeGroups): boolean {
    return expected ? expected.some(x => this.typeHas(type, x)) : true;
  }

  /**
   * Checks if type belongs to type group.
   * @param type - Type.
   * @param expected - Expected type group.
   * @returns _True_ if type belongs to type group, _false_ otherwise.
   */

  public typeIs(type: ts.Type, expected: TypeGroup | undefined): boolean {
    if (expected)
      switch (expected) {
        case TypeGroup.any: {
          return checkTypeFlags(type, ts.TypeFlags.Any);
        }

        case TypeGroup.array: {
          return (
            checkTypeFlags(
              type,
              ts.TypeFlags.NonPrimitive,
              ts.TypeFlags.Object
            ) && this.isArrayType(type)
          );
        }

        case TypeGroup.arrayOrTuple: {
          return (
            checkTypeFlags(
              type,
              ts.TypeFlags.NonPrimitive,
              ts.TypeFlags.Object
            ) && this.isArrayOrTupleType(type)
          );
        }

        case TypeGroup.boolean: {
          return checkTypeFlags(
            type,
            ts.TypeFlags.Boolean,
            ts.TypeFlags.BooleanLike,
            ts.TypeFlags.BooleanLiteral
          );
        }

        case TypeGroup.complex: {
          if (this.isArrayOrTupleType(type)) {
            const subtypes = type.typeArguments;

            assert.not.empty(subtypes, "Missing type arguments");

            return subtypes.some(subtype =>
              this.typeIs(subtype, TypeGroup.complex)
            );
          }

          if (type.isUnionOrIntersection())
            return type.types.some(subtype =>
              this.typeIs(subtype, TypeGroup.complex)
            );

          const symbol = type.getSymbol();

          return symbol && symbol.name.startsWith("__")
            ? type.getProperties().length > 0 &&
                checkTypeFlags(
                  type,
                  ts.TypeFlags.NonPrimitive,
                  ts.TypeFlags.Object
                )
            : false;
        }

        case TypeGroup.function: {
          return (
            checkTypeFlags(
              type,
              ts.TypeFlags.NonPrimitive,
              ts.TypeFlags.Object
            ) && type.getCallSignatures().length > 0
          );
        }

        case TypeGroup.never: {
          return checkTypeFlags(type, ts.TypeFlags.Never);
        }

        case TypeGroup.null: {
          return checkTypeFlags(type, ts.TypeFlags.Null);
        }

        case TypeGroup.number: {
          return checkTypeFlags(
            type,
            ts.TypeFlags.Number,
            ts.TypeFlags.NumberLike,
            ts.TypeFlags.NumberLiteral
          );
        }

        case TypeGroup.object: {
          return (
            checkTypeFlags(
              type,
              ts.TypeFlags.NonPrimitive,
              ts.TypeFlags.Object
            ) &&
            !this.typeIs(type, TypeGroup.arrayOrTuple) &&
            !this.typeIs(type, TypeGroup.function)
          );
        }

        case TypeGroup.parameter: {
          return type.isTypeParameter();
        }

        case TypeGroup.readonly: {
          return type
            .getProperties()
            .some(property =>
              tsutils.isPropertyReadonlyInType(
                type,
                property.getEscapedName(),
                this.checker
              )
            );
        }

        case TypeGroup.string: {
          return checkTypeFlags(
            type,
            ts.TypeFlags.String,
            ts.TypeFlags.StringLike,
            ts.TypeFlags.StringLiteral
          );
        }

        case TypeGroup.symbol: {
          return checkTypeFlags(
            type,
            ts.TypeFlags.ESSymbol,
            ts.TypeFlags.ESSymbolLike,
            ts.TypeFlags.UniqueESSymbol
          );
        }

        case TypeGroup.tuple: {
          return (
            checkTypeFlags(
              type,
              ts.TypeFlags.NonPrimitive,
              ts.TypeFlags.Object
            ) && this.isTupleType(type)
          );
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
  public typeIsNoneOf(type: ts.Type, expected?: TypeGroups): boolean {
    return expected ? expected.every(x => !this.typeIs(type, x)) : true;
  }

  /**
   * Checks if type belongs to one of type groups.
   * @param type - Type.
   * @param expected - Expected type groups.
   * @returns _True_ if type belongs to one of type groups, _false_ otherwise.
   */
  public typeIsOneOf(type: ts.Type, expected?: TypeGroups): boolean {
    return expected ? expected.some(x => this.typeIs(type, x)) : true;
  }

  /**
   * Extracts type parts from node.
   * @param node - Node.
   * @returns Type parts.
   */
  public typeParts(node: TSESTree.Node): TypeParts {
    return node.type === AST_NODE_TYPES.UnaryExpression &&
      node.operator === "typeof"
      ? this.typePartsTypeof(node)
      : this.typePartsNoTypeof(node);
  }

  protected readonly code: string;

  protected readonly toTsNode: ParserServices["esTreeNodeToTSNodeMap"]["get"];

  /**
   * Extracts type parts from node.
   * @param node - Node.
   * @returns Type parts.
   */
  protected typePartsNoTypeof(node: TSESTree.Node): TypeParts {
    return recurs(this.checker.getTypeAtLocation(this.toTsNode(node)));

    function recurs(type: ts.Type): TypeParts {
      if (type.isNumberLiteral()) return [type.value];

      if (type.isStringLiteral()) return [type.value];

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
  protected typePartsTypeof(node: TSESTree.UnaryExpression): TypeParts {
    return recurs(this.checker.getTypeAtLocation(this.toTsNode(node.argument)));

    function recurs(type: ts.Type): TypeParts {
      if (
        type.getCallSignatures().length > 0 ||
        type.getConstructSignatures().length > 0
      )
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

export type Signatures = readonly ts.Signature[];

export type TypeFlagsArray = readonly ts.TypeFlags[];

export type TypePart = NumStr | ts.Type;

export type TypeParts = readonly TypePart[];

export type Types = readonly ts.Type[];

const expectedFlags = new ReadonlySet<ExpectedFlags>([
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
function checkTypeFlags(type: ts.Type, ...flags: TypeFlagsArray): boolean {
  if (type.isTypeParameter()) {
    const constraint = type.getConstraint();

    if (is.empty(constraint)) return flags.includes(ts.TypeFlags.Unknown);

    type = constraint;
  }

  return (
    flags.includes(type.getFlags()) ||
    (type.isUnion() &&
      type.types.every(subtype => flags.includes(subtype.getFlags())))
  );
}

/**
 * Checks if value type is ExpectedFlags.
 * @param value - Value.
 * @returns _True_ if value type is ExpectedFlags, _false_ otherwise.
 */
function isExpectedFlags(value: unknown): value is ExpectedFlags {
  return typedef<ReadonlySet<unknown>>(expectedFlags).has(value);
}

type ExpectedFlags =
  | ts.TypeFlags.BigInt
  | ts.TypeFlags.BigIntLiteral
  | ts.TypeFlags.BooleanLiteral
  | ts.TypeFlags.ESSymbol
  | ts.TypeFlags.Null
  | ts.TypeFlags.Number
  | ts.TypeFlags.NumberLiteral
  | ts.TypeFlags.Object
  | ts.TypeFlags.String
  | ts.TypeFlags.StringLiteral
  | ts.TypeFlags.Undefined
  | ts.TypeFlags.UniqueESSymbol
  | ts.TypeFlags.Void;
