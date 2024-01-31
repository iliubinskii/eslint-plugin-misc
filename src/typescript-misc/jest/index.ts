import { o } from "typescript-misc";
import { preferMockCallsToBe } from "./prefer-mockCallsToBe";

export const jest = o.prefixKeys(
  { "prefer-mockCallsToBe": preferMockCallsToBe },
  "jest/"
);
