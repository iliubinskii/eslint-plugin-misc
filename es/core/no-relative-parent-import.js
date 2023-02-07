import * as utils from "../utils";
import { base } from "./base";
export const noRelativeParentImport = utils.wrapRule({
    rule: base["disallow-import"],
    options: [
        {
            disallow: [
                "..",
                "../**",
                "../..",
                "../../**",
                "../../..",
                "../../../**",
                "../../../..",
                "../../../../**",
                "../../../../..",
                "../../../../../**"
            ]
        }
    ],
    docs: {
        description: "Disallows relative parent import.",
        failExamples: 'import x from "../source";',
        passExamples: 'import x from "./source";'
    }
});
//# sourceMappingURL=no-relative-parent-import.js.map