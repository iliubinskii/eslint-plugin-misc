"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object = void 0;
const no_array_arg_1 = require("./no-array-arg");
const no_get_1 = require("./no-get");
const no_set_1 = require("./no-set");
const no_unfreeze_1 = require("./no-unfreeze");
const functions_1 = require("@skylib/functions");
const prefer_assign_1 = require("./prefer-assign");
const prefer_clone_1 = require("./prefer-clone");
const prefer_entries_1 = require("./prefer-entries");
const prefer_getPrototypeOf_1 = require("./prefer-getPrototypeOf");
const prefer_hasOwnProp_1 = require("./prefer-hasOwnProp");
const prefer_keys_1 = require("./prefer-keys");
const prefer_values_1 = require("./prefer-values");
exports.object = functions_1.o.prefixKeys({
    "no-array-arg": no_array_arg_1.noArrayArg,
    "no-get": no_get_1.noGet,
    "no-set": no_set_1.noSet,
    "no-unfreeze": no_unfreeze_1.noUnfreeze,
    "prefer-assign": prefer_assign_1.preferAssign,
    "prefer-clone": prefer_clone_1.preferClone,
    "prefer-entries": prefer_entries_1.preferEntries,
    "prefer-getPrototypeOf": prefer_getPrototypeOf_1.preferGetPrototypeOf,
    "prefer-hasOwnProp": prefer_hasOwnProp_1.preferHasOwnProp,
    "prefer-keys": prefer_keys_1.preferKeys,
    "prefer-values": prefer_values_1.preferValues
}, "object/");
//# sourceMappingURL=index.js.map