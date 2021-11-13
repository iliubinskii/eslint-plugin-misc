import { o } from "@skylib/functions";
import { preferMockCallsToBe } from "./prefer-mockCallsToBe";

export const jest = o.prefixKeys(
  { "prefer-mockCallsToBe": preferMockCallsToBe },
  "jest/"
);
