import * as utils from "../utils";
import { core } from "./core";

export const preferArrowStaticMethod = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Prefer arrow function",
      selector: "MethodDefinition[static=true]"
    }
  ],
  docs: {
    description: "Requires use of arrow static methods.",
    failExamples: "class C { static f() {} }",
    passExamples: "class C { static f = () => {}; }"
  }
});
