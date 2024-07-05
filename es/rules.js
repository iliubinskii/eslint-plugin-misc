import { core } from "./core";
import { getSynonyms } from "./utils";
import { typescript } from "./typescript";
export const rules = {
    ...core,
    ...typescript,
    ...getSynonyms("./.eslintrc.synonyms.cjs", { ...core, ...typescript })
};
//# sourceMappingURL=rules.js.map