import * as utils from "../utils";
import { core } from "./core";

export const noChainCoalescenceMixture = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Do not mix chain and coalescence operators",
      selector: "LogicalExpression[operator=??][left.type=ChainExpression]"
    }
  ],
  docs: {
    description: "Disallows mixing of chain and coalescence operators.",
    failExamples: "x?.y ?? z;",
    passExamples: `
      x?.y;
      x ?? y;
    `
  }
});
