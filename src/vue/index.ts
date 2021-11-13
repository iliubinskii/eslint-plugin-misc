import { componentName } from "./component-name";
import { core } from "./core";
import { noComplexDeclaratorType } from "./no-complex-declarator-type";
import { noComplexReturnType } from "./no-complex-return-type";
import { noEmptyLines } from "./no-empty-lines";
import { o } from "@skylib/functions";

export const vue = o.prefixKeys(
  {
    ...core,
    "component-name": componentName,
    "no-complex-declarator-type": noComplexDeclaratorType,
    "no-complex-return-type": noComplexReturnType,
    "no-empty-lines": noEmptyLines
  },
  "vue/"
);
