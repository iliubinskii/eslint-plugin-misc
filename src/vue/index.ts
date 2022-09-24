import { base } from "./base";
import { componentName } from "./component-name";
import { noComplexDeclaratorType } from "./no-complex-declarator-type";
import { noComplexReturnType } from "./no-complex-return-type";
import { o } from "real-fns";

export const vue = o.prefixKeys(
  {
    ...base,
    "component-name": componentName,
    "no-complex-declarator-type": noComplexDeclaratorType,
    "no-complex-return-type": noComplexReturnType
  },
  "vue/"
);
