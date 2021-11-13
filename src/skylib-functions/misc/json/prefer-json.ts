import * as utils from "../../../utils";
import { misc } from "../../../misc";

export const preferJson = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    { message: 'Use "json" module instead', selector: "Identifier[name=JSON]" }
  ]
});
