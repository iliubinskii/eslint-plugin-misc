import { base } from "./base";
import { classMethodsUseThis } from "./class-methods-use-this";
import { consistentArrayTypeName } from "./consistent-array-type-name";
import { defineFunctionInOneStatement } from "./define-function-in-one-statement";
import { noBooleanLiteralType } from "./no-boolean-literal-type";
import { noComplexDeclaratorType } from "./no-complex-declarator-type";
import { noComplexReturnType } from "./no-complex-return-type";
import { noEmptyInterfaces } from "./no-empty-interfaces";
import { noNever } from "./no-never";
import { noUnsafeObjectAssign } from "./no-unsafe-object-assign";
import { o } from "typescript-misc";
import { preferArrayTypeAlias } from "./prefer-array-type-alias";
import { preferClassMethod } from "./prefer-class-method";
import { preferReadonlyArray } from "./prefer-readonly-array";
import { preferReadonlyMap } from "./prefer-readonly-map";
import { preferReadonlyProperty } from "./prefer-readonly-property";
import { preferReadonlySet } from "./prefer-readonly-set";
import { requirePropTypeAnnotation } from "./require-prop-type-annotation";
import { requireThisVoid } from "./require-this-void";

export const typescript = o.prefixKeys(
  {
    ...base,
    "class-methods-use-this": classMethodsUseThis,
    "consistent-array-type-name": consistentArrayTypeName,
    "define-function-in-one-statement": defineFunctionInOneStatement,
    "no-boolean-literal-type": noBooleanLiteralType,
    "no-complex-declarator-type": noComplexDeclaratorType,
    "no-complex-return-type": noComplexReturnType,
    "no-empty-interfaces": noEmptyInterfaces,
    "no-never": noNever,
    "no-unsafe-object-assign": noUnsafeObjectAssign,
    "prefer-array-type-alias": preferArrayTypeAlias,
    "prefer-class-method": preferClassMethod,
    "prefer-readonly-array": preferReadonlyArray,
    "prefer-readonly-map": preferReadonlyMap,
    "prefer-readonly-property": preferReadonlyProperty,
    "prefer-readonly-set": preferReadonlySet,
    "require-prop-type-annotation": requirePropTypeAnnotation,
    "require-this-void": requireThisVoid
  },
  "typescript/"
);
