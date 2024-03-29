"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typescript = void 0;
const base_1 = require("./base");
const class_methods_use_this_1 = require("./class-methods-use-this");
const consistent_array_type_name_1 = require("./consistent-array-type-name");
const define_function_in_one_statement_1 = require("./define-function-in-one-statement");
const no_boolean_literal_type_1 = require("./no-boolean-literal-type");
const no_complex_declarator_type_1 = require("./no-complex-declarator-type");
const no_complex_return_type_1 = require("./no-complex-return-type");
const no_empty_interfaces_1 = require("./no-empty-interfaces");
const no_never_1 = require("./no-never");
const no_unsafe_object_assign_1 = require("./no-unsafe-object-assign");
const typescript_misc_1 = require("typescript-misc");
const prefer_array_type_alias_1 = require("./prefer-array-type-alias");
const prefer_class_method_1 = require("./prefer-class-method");
const prefer_readonly_array_1 = require("./prefer-readonly-array");
const prefer_readonly_map_1 = require("./prefer-readonly-map");
const prefer_readonly_property_1 = require("./prefer-readonly-property");
const prefer_readonly_set_1 = require("./prefer-readonly-set");
const require_prop_type_annotation_1 = require("./require-prop-type-annotation");
const require_this_void_1 = require("./require-this-void");
exports.typescript = typescript_misc_1.o.prefixKeys({
    ...base_1.base,
    "class-methods-use-this": class_methods_use_this_1.classMethodsUseThis,
    "consistent-array-type-name": consistent_array_type_name_1.consistentArrayTypeName,
    "define-function-in-one-statement": define_function_in_one_statement_1.defineFunctionInOneStatement,
    "no-boolean-literal-type": no_boolean_literal_type_1.noBooleanLiteralType,
    "no-complex-declarator-type": no_complex_declarator_type_1.noComplexDeclaratorType,
    "no-complex-return-type": no_complex_return_type_1.noComplexReturnType,
    "no-empty-interfaces": no_empty_interfaces_1.noEmptyInterfaces,
    "no-never": no_never_1.noNever,
    "no-unsafe-object-assign": no_unsafe_object_assign_1.noUnsafeObjectAssign,
    "prefer-array-type-alias": prefer_array_type_alias_1.preferArrayTypeAlias,
    "prefer-class-method": prefer_class_method_1.preferClassMethod,
    "prefer-readonly-array": prefer_readonly_array_1.preferReadonlyArray,
    "prefer-readonly-map": prefer_readonly_map_1.preferReadonlyMap,
    "prefer-readonly-property": prefer_readonly_property_1.preferReadonlyProperty,
    "prefer-readonly-set": prefer_readonly_set_1.preferReadonlySet,
    "require-prop-type-annotation": require_prop_type_annotation_1.requirePropTypeAnnotation,
    "require-this-void": require_this_void_1.requireThisVoid
}, "typescript/");
//# sourceMappingURL=index.js.map