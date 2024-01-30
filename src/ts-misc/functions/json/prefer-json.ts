import * as utils from "../../../utils";
import { core } from "../../../core";

export const preferJson = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    { message: 'Use "json" module instead', selector: "Identifier[name=JSON]" }
  ]
});
