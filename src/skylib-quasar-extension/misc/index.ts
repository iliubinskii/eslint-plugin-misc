import { noComputedTypeParam } from "./no-computed-type-param";
import { noRefTypeParam } from "./no-ref-type-param";
import { noRefUndefined } from "./no-ref-undefined";
import { requireRefTypeParam } from "./require-ref-type-param";

export const misc = {
  "no-computed-type-param": noComputedTypeParam,
  "no-ref-type-param": noRefTypeParam,
  "no-ref-undefined": noRefUndefined,
  "require-ref-type-param": requireRefTypeParam
} as const;
