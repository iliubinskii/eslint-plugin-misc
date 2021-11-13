import { arrayAlwaysFalse } from "./array-always-false";
import { arrayAlwaysTrue } from "./array-always-true";
import { booleanAlwaysFalse } from "./boolean-always-false";
import { booleanAlwaysTrue } from "./boolean-always-true";
import { callableAlwaysFalse } from "./callable-always-false";
import { callableAlwaysTrue } from "./callable-always-true";
import { emptyAlwaysFalse } from "./empty-always-false";
import { emptyAlwaysTrue } from "./empty-always-true";
import { enumerationAlwaysFalse } from "./enumeration-always-false";
import { falseAlwaysFalse } from "./false-always-false";
import { indexedObjectAlwaysFalse } from "./indexedObject-always-false";
import { indexedObjectAlwaysTrue } from "./indexedObject-always-true";
import { instanceOfAlwaysFalse } from "./instanceOf-always-false";
import { mapAlwaysFalse } from "./map-always-false";
import { notEmptyAlwaysFalse } from "./not-empty-always-false";
import { notEmptyAlwaysTrue } from "./not-empty-always-true";
import { nullAlwaysFalse } from "./null-always-false";
import { nullAlwaysTrue } from "./null-always-true";
import { numStrAlwaysFalse } from "./numStr-always-false";
import { numStrAlwaysTrue } from "./numStr-always-true";
import { numberAlwaysFalse } from "./number-always-false";
import { numberAlwaysTrue } from "./number-always-true";
import { o } from "@skylib/functions";
import { objectAlwaysFalse } from "./object-always-false";
import { objectAlwaysTrue } from "./object-always-true";
import { requireObjectTypeParam } from "./require-object-type-param";
import { setAlwaysFalse } from "./set-always-false";
import { stringAlwaysFalse } from "./string-always-false";
import { stringAlwaysTrue } from "./string-always-true";
import { symbolAlwaysFalse } from "./symbol-always-false";
import { symbolAlwaysTrue } from "./symbol-always-true";
import { trueAlwaysFalse } from "./true-always-false";
import { tupleAlwaysFalse } from "./tuple-always-false";
import { undefinedAlwaysFalse } from "./undefined-always-false";
import { undefinedAlwaysTrue } from "./undefined-always-true";

export const guards = o.prefixKeys(
  {
    "array-always-false": arrayAlwaysFalse,
    "array-always-true": arrayAlwaysTrue,
    "boolean-always-false": booleanAlwaysFalse,
    "boolean-always-true": booleanAlwaysTrue,
    "callable-always-false": callableAlwaysFalse,
    "callable-always-true": callableAlwaysTrue,
    "empty-always-false": emptyAlwaysFalse,
    "empty-always-true": emptyAlwaysTrue,
    "enumeration-always-false": enumerationAlwaysFalse,
    "false-always-false": falseAlwaysFalse,
    "indexedObject-always-false": indexedObjectAlwaysFalse,
    "indexedObject-always-true": indexedObjectAlwaysTrue,
    "instanceOf-always-false": instanceOfAlwaysFalse,
    "map-always-false": mapAlwaysFalse,
    "not-empty-always-false": notEmptyAlwaysFalse,
    "not-empty-always-true": notEmptyAlwaysTrue,
    "null-always-false": nullAlwaysFalse,
    "null-always-true": nullAlwaysTrue,
    "numStr-always-false": numStrAlwaysFalse,
    "numStr-always-true": numStrAlwaysTrue,
    "number-always-false": numberAlwaysFalse,
    "number-always-true": numberAlwaysTrue,
    "object-always-false": objectAlwaysFalse,
    "object-always-true": objectAlwaysTrue,
    "require-object-type-param": requireObjectTypeParam,
    "set-always-false": setAlwaysFalse,
    "string-always-false": stringAlwaysFalse,
    "string-always-true": stringAlwaysTrue,
    "symbol-always-false": symbolAlwaysFalse,
    "symbol-always-true": symbolAlwaysTrue,
    "true-always-false": trueAlwaysFalse,
    "tuple-always-false": tupleAlwaysFalse,
    "undefined-always-false": undefinedAlwaysFalse,
    "undefined-always-true": undefinedAlwaysTrue
  },
  "guards/"
);
