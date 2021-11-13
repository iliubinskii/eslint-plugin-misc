"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.guards = void 0;
const array_always_false_1 = require("./array-always-false");
const array_always_true_1 = require("./array-always-true");
const boolean_always_false_1 = require("./boolean-always-false");
const boolean_always_true_1 = require("./boolean-always-true");
const callable_always_false_1 = require("./callable-always-false");
const callable_always_true_1 = require("./callable-always-true");
const empty_always_false_1 = require("./empty-always-false");
const empty_always_true_1 = require("./empty-always-true");
const enumeration_always_false_1 = require("./enumeration-always-false");
const false_always_false_1 = require("./false-always-false");
const indexedObject_always_false_1 = require("./indexedObject-always-false");
const indexedObject_always_true_1 = require("./indexedObject-always-true");
const instanceOf_always_false_1 = require("./instanceOf-always-false");
const map_always_false_1 = require("./map-always-false");
const not_empty_always_false_1 = require("./not-empty-always-false");
const not_empty_always_true_1 = require("./not-empty-always-true");
const null_always_false_1 = require("./null-always-false");
const null_always_true_1 = require("./null-always-true");
const numStr_always_false_1 = require("./numStr-always-false");
const numStr_always_true_1 = require("./numStr-always-true");
const number_always_false_1 = require("./number-always-false");
const number_always_true_1 = require("./number-always-true");
const functions_1 = require("@skylib/functions");
const object_always_false_1 = require("./object-always-false");
const object_always_true_1 = require("./object-always-true");
const require_object_type_param_1 = require("./require-object-type-param");
const set_always_false_1 = require("./set-always-false");
const string_always_false_1 = require("./string-always-false");
const string_always_true_1 = require("./string-always-true");
const symbol_always_false_1 = require("./symbol-always-false");
const symbol_always_true_1 = require("./symbol-always-true");
const true_always_false_1 = require("./true-always-false");
const tuple_always_false_1 = require("./tuple-always-false");
const undefined_always_false_1 = require("./undefined-always-false");
const undefined_always_true_1 = require("./undefined-always-true");
exports.guards = functions_1.o.prefixKeys({
    "array-always-false": array_always_false_1.arrayAlwaysFalse,
    "array-always-true": array_always_true_1.arrayAlwaysTrue,
    "boolean-always-false": boolean_always_false_1.booleanAlwaysFalse,
    "boolean-always-true": boolean_always_true_1.booleanAlwaysTrue,
    "callable-always-false": callable_always_false_1.callableAlwaysFalse,
    "callable-always-true": callable_always_true_1.callableAlwaysTrue,
    "empty-always-false": empty_always_false_1.emptyAlwaysFalse,
    "empty-always-true": empty_always_true_1.emptyAlwaysTrue,
    "enumeration-always-false": enumeration_always_false_1.enumerationAlwaysFalse,
    "false-always-false": false_always_false_1.falseAlwaysFalse,
    "indexedObject-always-false": indexedObject_always_false_1.indexedObjectAlwaysFalse,
    "indexedObject-always-true": indexedObject_always_true_1.indexedObjectAlwaysTrue,
    "instanceOf-always-false": instanceOf_always_false_1.instanceOfAlwaysFalse,
    "map-always-false": map_always_false_1.mapAlwaysFalse,
    "not-empty-always-false": not_empty_always_false_1.notEmptyAlwaysFalse,
    "not-empty-always-true": not_empty_always_true_1.notEmptyAlwaysTrue,
    "null-always-false": null_always_false_1.nullAlwaysFalse,
    "null-always-true": null_always_true_1.nullAlwaysTrue,
    "numStr-always-false": numStr_always_false_1.numStrAlwaysFalse,
    "numStr-always-true": numStr_always_true_1.numStrAlwaysTrue,
    "number-always-false": number_always_false_1.numberAlwaysFalse,
    "number-always-true": number_always_true_1.numberAlwaysTrue,
    "object-always-false": object_always_false_1.objectAlwaysFalse,
    "object-always-true": object_always_true_1.objectAlwaysTrue,
    "require-object-type-param": require_object_type_param_1.requireObjectTypeParam,
    "set-always-false": set_always_false_1.setAlwaysFalse,
    "string-always-false": string_always_false_1.stringAlwaysFalse,
    "string-always-true": string_always_true_1.stringAlwaysTrue,
    "symbol-always-false": symbol_always_false_1.symbolAlwaysFalse,
    "symbol-always-true": symbol_always_true_1.symbolAlwaysTrue,
    "true-always-false": true_always_false_1.trueAlwaysFalse,
    "tuple-always-false": tuple_always_false_1.tupleAlwaysFalse,
    "undefined-always-false": undefined_always_false_1.undefinedAlwaysFalse,
    "undefined-always-true": undefined_always_true_1.undefinedAlwaysTrue
}, "guards/");
//# sourceMappingURL=index.js.map