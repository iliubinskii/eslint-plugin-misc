import * as utils from "./utils";
import { rules as core } from "./rules.core";

export const rules = {
  ...core,
  ...utils.getSynonyms("./.eslintrc.synonyms.js", core)
} as const;
