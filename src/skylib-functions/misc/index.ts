import { array } from "./array";
import { converters } from "./converters";
import { guards } from "./guards";
import { json } from "./json";
import { noEvaluateTypeParam } from "./no-evaluate-type-param";
import { object } from "./object";
import { preferDefineFn } from "./prefer-defineFn";
import { preferEvaluate } from "./prefer-evaluate";
import { preferReadonlyMap } from "./prefer-ReadonlyMap";
import { preferReadonlySet } from "./prefer-ReadonlySet";
import { programFlow } from "./program-flow";
import { reflect } from "./reflect";
import { requireJsdoc } from "./require-jsdoc";
import { requireReturnInDefineFn } from "./require-return-in-defineFn";
import { types } from "./types";

export const misc = {
  "no-evaluate-type-param": noEvaluateTypeParam,
  "prefer-ReadonlyMap": preferReadonlyMap,
  "prefer-ReadonlySet": preferReadonlySet,
  "prefer-defineFn": preferDefineFn,
  "prefer-evaluate": preferEvaluate,
  "require-jsdoc": requireJsdoc,
  "require-return-in-defineFn": requireReturnInDefineFn,
  ...array,
  ...converters,
  ...guards,
  ...json,
  ...object,
  ...programFlow,
  ...reflect,
  ...types
} as const;
