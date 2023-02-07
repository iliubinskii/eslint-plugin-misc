import * as utils from "../utils";
import { base } from "./base";
import { evaluate } from "real-fns";
export const noBooleanLiteralType = evaluate(() => {
    const prefix = "TSPropertySignature[optional=true] > TSTypeAnnotation > TSLiteralType.typeAnnotation";
    return utils.wrapRule({
        rule: base["no-restricted-syntax"],
        options: [
            {
                message: 'Use "boolean" type instead',
                selector: [
                    `${prefix} > Literal[value=true]`,
                    `${prefix} > Literal[value=false]`
                ]
            }
        ],
        docs: {
            description: "Disallows boolean literal type.",
            failExamples: `
        interface I {
          x?: true;
          y?: false;
        }
      `,
            passExamples: `
        interface I {
          x?: boolean;
        }
      `
        }
    });
});
//# sourceMappingURL=no-boolean-literal-type.js.map