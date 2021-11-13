"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.array = void 0;
const fromIterable_arg_type_1 = require("./fromIterable-arg-type");
const mixedFrom_include_array_1 = require("./mixedFrom-include-array");
const mixedFrom_include_non_array_1 = require("./mixedFrom-include-non-array");
const functions_1 = require("@skylib/functions");
const prefer_clone_1 = require("./prefer-clone");
const prefer_first_1 = require("./prefer-first");
const prefer_fromIterable_1 = require("./prefer-fromIterable");
const prefer_reverse_1 = require("./prefer-reverse");
const prefer_second_1 = require("./prefer-second");
const prefer_sort_1 = require("./prefer-sort");
const prefer_third_1 = require("./prefer-third");
const prefer_truncate_1 = require("./prefer-truncate");
exports.array = functions_1.o.prefixKeys({
    "fromIterable-arg-type": fromIterable_arg_type_1.fromIterableArgType,
    "mixedFrom-include-array": mixedFrom_include_array_1.mixedFromIncludeArray,
    "mixedFrom-include-non-array": mixedFrom_include_non_array_1.mixedFromIncludeNonArray,
    "prefer-clone": prefer_clone_1.preferClone,
    "prefer-first": prefer_first_1.preferFirst,
    "prefer-fromIterable": prefer_fromIterable_1.preferFromIterable,
    "prefer-reverse": prefer_reverse_1.preferReverse,
    "prefer-second": prefer_second_1.preferSecond,
    "prefer-sort": prefer_sort_1.preferSort,
    "prefer-third": prefer_third_1.preferThird,
    "prefer-truncate": prefer_truncate_1.preferTruncate
}, "array/");
//# sourceMappingURL=index.js.map