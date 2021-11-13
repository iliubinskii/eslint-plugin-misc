import { o } from "@skylib/functions";
import { preferFindQuasarComponent } from "./prefer-findQuasarComponent";
import { preferTestComponents } from "./prefer-testComponents";

export const jest = o.prefixKeys(
  {
    "prefer-findQuasarComponent": preferFindQuasarComponent,
    "prefer-testComponents": preferTestComponents
  },
  "jest/"
);
