import * as utils from "../utils";
import { base } from "./base";
export const noAtSignImport = utils.wrapRule({
    rule: base["disallow-import"],
    options: [{ disallow: ["@"] }],
    docs: {
        description: 'Disallows "@" import.',
        failExamples: 'import x from "@";',
        passExamples: 'import x from "@/folder";'
    }
});
//# sourceMappingURL=no-at-sign-import.js.map