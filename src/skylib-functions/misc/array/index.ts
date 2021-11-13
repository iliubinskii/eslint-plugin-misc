import { fromIterableArgType } from "./fromIterable-arg-type";
import { mixedFromIncludeArray } from "./mixedFrom-include-array";
import { mixedFromIncludeNonArray } from "./mixedFrom-include-non-array";
import { o } from "@skylib/functions";
import { preferClone } from "./prefer-clone";
import { preferFirst } from "./prefer-first";
import { preferFromIterable } from "./prefer-fromIterable";
import { preferReverse } from "./prefer-reverse";
import { preferSecond } from "./prefer-second";
import { preferSort } from "./prefer-sort";
import { preferThird } from "./prefer-third";
import { preferTruncate } from "./prefer-truncate";

export const array = o.prefixKeys(
  {
    "fromIterable-arg-type": fromIterableArgType,
    "mixedFrom-include-array": mixedFromIncludeArray,
    "mixedFrom-include-non-array": mixedFromIncludeNonArray,
    "prefer-clone": preferClone,
    "prefer-first": preferFirst,
    "prefer-fromIterable": preferFromIterable,
    "prefer-reverse": preferReverse,
    "prefer-second": preferSecond,
    "prefer-sort": preferSort,
    "prefer-third": preferThird,
    "prefer-truncate": preferTruncate
  },
  "array/"
);
