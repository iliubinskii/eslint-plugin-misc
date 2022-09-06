import * as utils from "../utils";
import { base } from "./base";

export const noInternalModules = utils.wrapRule({
  rule: base["disallow-import"],
  options: [{ allow: "@/**", disallow: ["./*/**", "[^@]*/**", "@*/*/**"] }],
  docs: {
    description: "Disallows importing of internal modules.",
    failExamples: `
      import "./folder/internal";
      import "package/internal";
      import "@scope/package/internal";

    `,
    passExamples: `
      import "./folder";
      import "package";
      import "@scope/package";
    `
  }
});
