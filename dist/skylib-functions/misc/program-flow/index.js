"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programFlow = void 0;
const functions_1 = require("@skylib/functions");
const prefer_clearInterval_1 = require("./prefer-clearInterval");
const prefer_clearTimeout_1 = require("./prefer-clearTimeout");
const prefer_setInterval_1 = require("./prefer-setInterval");
const prefer_setTimeout_1 = require("./prefer-setTimeout");
exports.programFlow = functions_1.o.prefixKeys({
    "prefer-clearInterval": prefer_clearInterval_1.preferClearInterval,
    "prefer-clearTimeout": prefer_clearTimeout_1.preferClearTimeout,
    "prefer-setInterval": prefer_setInterval_1.preferSetInterval,
    "prefer-setTimeout": prefer_setTimeout_1.preferSetTimeout
}, "program-flow/");
//# sourceMappingURL=index.js.map