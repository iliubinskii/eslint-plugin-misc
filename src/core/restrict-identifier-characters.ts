import * as utils from "../utils";
import { base } from "./base";

export const restrictIdentifierCharacters = utils.wrapRule({
  rule: base["no-restricted-syntax"],
  options: [
    {
      message: "Identifier must consist of english characters and dollar sign",
      selector: String.raw`Identifier[name=/[^$\w]/u]`
    }
  ],
  docs: {
    description:
      "Requires that identifier consists only of english characters and dollar sign.",
    failExamples: "const абв = 1;",
    passExamples: "const $x1 = 2;"
  }
});
