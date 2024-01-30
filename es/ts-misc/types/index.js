import { noTsToolbelt } from "./no-ts-toolbelt";
import { noWritable } from "./no-Writable";
import { o } from "real-fns";
import { preferIndexedObject } from "./prefer-IndexedObject";
import { preferIndexedRecord } from "./prefer-IndexedRecord";
import { preferNumStr } from "./prefer-NumStr";
import { preferPartialRecord } from "./prefer-PartialRecord";
import { preferUndefinedShorthand } from "./prefer-undefined-shorthand";
import { preferWritableIndexedObject } from "./prefer-WritableIndexedObject";
import { preferWritableRecord } from "./prefer-WritableRecord";
export const types = o.prefixKeys({
    "no-Writable": noWritable,
    "no-ts-toolbelt": noTsToolbelt,
    "prefer-IndexedObject": preferIndexedObject,
    "prefer-IndexedRecord": preferIndexedRecord,
    "prefer-NumStr": preferNumStr,
    "prefer-PartialRecord": preferPartialRecord,
    "prefer-WritableIndexedObject": preferWritableIndexedObject,
    "prefer-WritableRecord": preferWritableRecord,
    "prefer-undefined-shorthand": preferUndefinedShorthand
}, "types/");
//# sourceMappingURL=index.js.map