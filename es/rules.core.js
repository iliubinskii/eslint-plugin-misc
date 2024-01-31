import { core } from "./core";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { projectChore } from "./project-chore";
import { typescript } from "./typescript";
import { typescriptMisc } from "./typescript-misc";
export const rules = {
    ...core,
    ...eslintrc,
    ...jest,
    ...projectChore,
    ...typescript,
    ...typescriptMisc
};
//# sourceMappingURL=rules.core.js.map