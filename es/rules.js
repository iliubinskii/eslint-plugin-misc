import * as utils from "./utils";
import { rules as core } from "./rules.core";
export const rules = Object.assign(Object.assign({}, core), utils.getSynonyms("./.eslintrc.synonyms.js", core));
//# sourceMappingURL=rules.js.map