import * as utils from "../utils";
import { core } from "./core";

export const consistentSourceExtension = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Remove extension",
      selector: "Literal.source[value=/\\.(?:js|json|ts)$/u]"
    }
  ],
  docs: {
    description: "Requires consistent import/export source extension.",
    failExamples: `
      import x1 from "source1.js";
      import x2 from "source2.json";
      import x3 from "source3.ts";
    `,
    passExamples: `
      import x1 from "source1";
      import x2 from "source2";
      import x3 from "source3";
    `
  }
});
