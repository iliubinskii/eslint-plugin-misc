import * as utils from "../utils";
import { base } from "./base";
import { evaluate } from "real-fns";
export const noLanguageMixing = evaluate(() => {
    const br = "[\\d_]*";
    const eng = "\\w";
    const international = "[^\\u0000-\\u00FF]";
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
            failExamples: 
            // eslint-disable-next-line misc/no-language-mixing -- Ok
            'const x = "xyz123абв";',
            passExamples: `
        const x = "xyz";
        const y = "123";
        const z = "абв";
      `
        }
    });
});
//# sourceMappingURL=no-language-mixing.js.map