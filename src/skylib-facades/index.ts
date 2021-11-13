import { o } from "@skylib/functions";
import { preferUniqueIdFacade } from "./prefer-uniqueId-facade";

export const skylibFacades = o.prefixKeys(
  { "prefer-uniqueId-facade": preferUniqueIdFacade },
  "facades/"
);
