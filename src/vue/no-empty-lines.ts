import * as utils from "../utils";
import { misc } from "../misc";

export const noEmptyLines = utils.wrapRule({
  rule: misc["no-restricted-syntax"],
  options: [
    {
      message: "Unexpected empty line",
      selector: "VElement[name=template] VText[value=/^\\s*\\n\\s*\\n\\s*$/u]"
    }
  ],
  docs: {
    // eslint-disable-next-line xss/no-mixed-html -- Ok
    description: "Disallow empty lines inside <template> section.",
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
