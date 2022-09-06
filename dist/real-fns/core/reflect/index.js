"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reflect = void 0;
const no_get_1 = require("./no-get");
const no_set_1 = require("./no-set");
const real_fns_1 = require("real-fns");
const prefer_reflect_1 = require("./prefer-reflect");
exports.reflect = real_fns_1.o.prefixKeys({ "no-get": no_get_1.noGet, "no-set": no_set_1.noSet, "prefer-reflect": prefer_reflect_1.preferReflect }, "reflect/");
//# sourceMappingURL=index.js.map