import { o } from "real-fns";
import { preferUniqueIdFacade } from "./prefer-uniqueId-facade";

export const realFacades = o.prefixKeys(
  { "prefer-uniqueId-facade": preferUniqueIdFacade },
  "real-facades/"
);
