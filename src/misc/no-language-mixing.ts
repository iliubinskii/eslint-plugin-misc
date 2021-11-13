import * as utils from "../utils";
import { core } from "./core";
import { evaluate } from "@skylib/functions";

export const noLanguageMixing = evaluate(() => {
  const br = "[\\d_]*";

  const eng = "\\w";

  const international = "[^\\u0000-\\u00FF]";

  const re = `/${eng}${br}${international}|${international}${br}${eng}/u`;

  return utils.wrapRule({
    rule: core["no-restricted-syntax"],
    options: [
      {
        message: "No language mixing",
        selector: [`Literal[value=${re}]`, `TemplateLiteral[value.raw=${re}]`]
      }
    ],
    docs: {
      description: "Disallows langauge mixing.",
      failExamples:
        // eslint-disable-next-line @skylib/no-language-mixing -- Ok
        'const x = "xyz123абв";',
      passExamples: `
        const x = "xyz";
        const y = "123";
        const z = "абв";
      `
    }
  });
});
