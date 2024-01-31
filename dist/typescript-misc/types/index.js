"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
const no_ts_toolbelt_1 = require("./no-ts-toolbelt");
const no_Writable_1 = require("./no-Writable");
const typescript_misc_1 = require("typescript-misc");
const prefer_IndexedObject_1 = require("./prefer-IndexedObject");
const prefer_IndexedRecord_1 = require("./prefer-IndexedRecord");
const prefer_NumStr_1 = require("./prefer-NumStr");
const prefer_PartialRecord_1 = require("./prefer-PartialRecord");
const prefer_undefined_shorthand_1 = require("./prefer-undefined-shorthand");
const prefer_WritableIndexedObject_1 = require("./prefer-WritableIndexedObject");
const prefer_WritableRecord_1 = require("./prefer-WritableRecord");
exports.types = typescript_misc_1.o.prefixKeys({
    "no-Writable": no_Writable_1.noWritable,
    "no-ts-toolbelt": no_ts_toolbelt_1.noTsToolbelt,
    "prefer-IndexedObject": prefer_IndexedObject_1.preferIndexedObject,
    "prefer-IndexedRecord": prefer_IndexedRecord_1.preferIndexedRecord,
    "prefer-NumStr": prefer_NumStr_1.preferNumStr,
    "prefer-PartialRecord": prefer_PartialRecord_1.preferPartialRecord,
    "prefer-WritableIndexedObject": prefer_WritableIndexedObject_1.preferWritableIndexedObject,
    "prefer-WritableRecord": prefer_WritableRecord_1.preferWritableRecord,
    "prefer-undefined-shorthand": prefer_undefined_shorthand_1.preferUndefinedShorthand
}, "types/");
//# sourceMappingURL=index.js.map