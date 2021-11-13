import { noTsToolbelt } from "./no-ts-toolbelt";
import { noWritable } from "./no-Writable";
import { o } from "@skylib/functions";
import { preferIndexedObject } from "./prefer-IndexedObject";
import { preferIndexedRecord } from "./prefer-IndexedRecord";
import { preferNumStr } from "./prefer-NumStr";
import { preferPartialRecord } from "./prefer-PartialRecord";
import { preferUndefinedShorthandLiteral } from "./prefer-undefined-shorthand-literal";
import { preferUndefinedShorthandType } from "./prefer-undefined-shorthand-type";
import { preferUndefinedShorthandTypeName } from "./prefer-undefined-shorthand-typeName";
import { preferWritableIndexedObject } from "./prefer-WritableIndexedObject";
import { preferWritableRecord } from "./prefer-WritableRecord";

export const types = o.prefixKeys(
  {
    "no-Writable": noWritable,
    "no-ts-toolbelt": noTsToolbelt,
    "prefer-IndexedObject": preferIndexedObject,
    "prefer-IndexedRecord": preferIndexedRecord,
    "prefer-NumStr": preferNumStr,
    "prefer-PartialRecord": preferPartialRecord,
    "prefer-WritableIndexedObject": preferWritableIndexedObject,
    "prefer-WritableRecord": preferWritableRecord,
    "prefer-undefined-shorthand-literal": preferUndefinedShorthandLiteral,
    "prefer-undefined-shorthand-type": preferUndefinedShorthandType,
    "prefer-undefined-shorthand-typeName": preferUndefinedShorthandTypeName
  },
  "types/"
);
