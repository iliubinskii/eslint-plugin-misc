import { noMessageDot } from "./no-message-dot";
import { noUnnecessaryArray } from "./no-unnecessary-array";
import { o } from "@skylib/functions";
import { sortArray } from "./sort-array";
import { sortSuboptions } from "./sort-suboptions";

export const eslintrc = o.prefixKeys(
  {
    "no-message-dot": noMessageDot,
    "no-unnecessary-array": noUnnecessaryArray,
    "sort-array": sortArray,
    "sort-suboptions": sortSuboptions
  },
  "eslintrc/"
);
