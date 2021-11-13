import * as utils from "../utils";
import { core } from "./core";

export const noInternalModules = utils.wrapRule({
  rule: core["disallow-import"],
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
