import { core } from "./core";
import { eslintrc } from "./eslintrc";
import { jest } from "./jest";
import { projectChore } from "./project-chore";
import { tsMisc } from "./ts-misc";
import { typescript } from "./typescript";
export const rules = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, core), eslintrc), jest), projectChore), tsMisc), typescript);
//# sourceMappingURL=rules.core.js.map