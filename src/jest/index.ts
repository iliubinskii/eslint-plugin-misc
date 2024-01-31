import { noToThrowLiteral } from "./no-toThrow-literal";
import { o } from "typescript-misc";
import { preferToBe } from "./prefer-toBe";
import { preferToStrictEqual } from "./prefer-toStrictEqual";

export const jest = o.prefixKeys(
  {
    "no-toThrow-literal": noToThrowLiteral,
    "prefer-toBe": preferToBe,
    "prefer-toStrictEqual": preferToStrictEqual
  },
  "jest/"
);
