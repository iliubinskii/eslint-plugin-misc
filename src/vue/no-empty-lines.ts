import * as utils from "../utils";
import { core } from "../core";

export const noEmptyLines = utils.wrapRule({
  rule: core["no-restricted-syntax"],
  options: [
    {
      message: "Unexpected empty line",
      selector: "VElement[name=template] VText[value=/^\\s*\\n\\s*\\n\\s*$/u]"
    }
  ],
  docs: {
    description: "Disallow empty lines inside &lt;template&gt; section.",
    failExamples: `
      <template>
        <p></p>

        <p></p>
      </template>
    `,
    passExamples: `
      <template>
        <p></p>
        text

        text
        <p></p>
      </template>
    `
  }
});
