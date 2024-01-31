import { array } from "./array";
import { converters } from "./converters";
import { guards } from "./guards";
import { json } from "./json";
import { noEvaluateTypeParam } from "./no-evaluate-type-param";
import { o } from "typescript-misc";
import { object } from "./object";
import { preferDefineFn } from "./prefer-defineFn";
import { preferEvaluate } from "./prefer-evaluate";
import { preferReadonlyMap } from "./prefer-readonly-map";
import { preferReadonlySet } from "./prefer-readonly-set";
import { requireJsdoc } from "./require-jsdoc";
import { requireReturnInDefineFn } from "./require-return-in-defineFn";

export const functions = o.prefixKeys(
  {
    "no-evaluate-type-param": noEvaluateTypeParam,
    "prefer-defineFn": preferDefineFn,
    "prefer-evaluate": preferEvaluate,
    "prefer-readonly-map": preferReadonlyMap,
    "prefer-readonly-set": preferReadonlySet,
    "require-jsdoc": requireJsdoc,
    "require-return-in-defineFn": requireReturnInDefineFn,
    ...array,
    ...converters,
    ...guards,
    ...json,
    ...object
  },
  "functions/"
);
