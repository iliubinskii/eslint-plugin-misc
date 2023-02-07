import * as utils from "../utils";
import { base } from "./base";
export const noUnnecessaryInitialization = utils.wrapRule({
    rule: base["no-restricted-syntax"],
    options: [
        {
            message: "Unnecessary initialization",
            selector: [
                "PropertyDefinition > Identifier.value[name=undefined]",
                "VariableDeclarator > Identifier.init[name=undefined]"
            ]
        }
    ],
    docs: {
        description: "Disallows unnecessary initialization.",
        failExamples: `
      const x = undefined;

      class C {
        x = undefined;
      }
    `,
        passExamples: `
      const x = 1;

      class C {
        x = 1;
      }
    `
    }
});
//# sourceMappingURL=no-unnecessary-initialization.js.map