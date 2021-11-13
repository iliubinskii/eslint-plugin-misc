import * as utils from "../utils";
import { core } from "./core";

export const noRelativeParentImport = utils.wrapRule({
  rule: core["disallow-import"],
  options: [
    {
      disallow: [
        "../**",
        "../../**",
        "../../../**",
        "../../../../**",
        "../../../../../**"
      ]
    }
  ],
  docs: {
    description: "Disallows relative parent import.",
    failExamples: 'import x from "../source";',
    passExamples: 'import x from "./source";'
  }
});
