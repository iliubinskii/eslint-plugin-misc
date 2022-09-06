import { o } from "real-fns";
import { preferMockCallsToBe } from "./prefer-mockCallsToBe";

export const jest = o.prefixKeys(
  { "prefer-mockCallsToBe": preferMockCallsToBe },
  "jest/"
);
