import * as utils from "../utils";
import { base } from "./base";
import { evaluate } from "typescript-misc";

export const noLanguageMixing = evaluate(() => {
  const br = String.raw`[\d_]*`;

  const eng = String.raw`\w`;

  const international = String.raw`[^\u0000-\u00FF]`;

  const re = `/${eng}${br}${international}|${international}${br}${eng}/u`;

  return utils.wrapRule({
    rule: base["no-restricted-syntax"],
    options: [
      {
        message: "No language mixing",
        selector: [`Literal[value=${re}]`, `TemplateLiteral[value.raw=${re}]`]
      }
    ],
    docs: {
      description: "Disallows language mixing.",
      failExamples: 'const x = "xyz123абв";',
      passExamples: `
        const x = "xyz";
        const y = "123";
        const z = "абв";
      `
    }
  });
});
