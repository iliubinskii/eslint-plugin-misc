import { noDisable } from "./no-disable";
import { noRules } from "./no-rules";
import { noTemp } from "./no-temp";
import { o } from "@skylib/functions";
import { sortSynonyms } from "./sort-synonyms";

export const eslintrc = o.prefixKeys(
  {
    "no-disable": noDisable,
    "no-rules": noRules,
    "no-temp": noTemp,
    "sort-synonyms": sortSynonyms
  },
  "eslintrc/"
);
