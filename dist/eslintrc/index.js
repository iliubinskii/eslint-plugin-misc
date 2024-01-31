"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eslintrc = void 0;
const no_message_dot_1 = require("./no-message-dot");
const no_unnecessary_array_1 = require("./no-unnecessary-array");
const typescript_misc_1 = require("typescript-misc");
const sort_array_1 = require("./sort-array");
const sort_suboptions_1 = require("./sort-suboptions");
exports.eslintrc = typescript_misc_1.o.prefixKeys({
    "no-message-dot": no_message_dot_1.noMessageDot,
    "no-unnecessary-array": no_unnecessary_array_1.noUnnecessaryArray,
    "sort-array": sort_array_1.sortArray,
    "sort-suboptions": sort_suboptions_1.sortSuboptions
}, "eslintrc/");
//# sourceMappingURL=index.js.map