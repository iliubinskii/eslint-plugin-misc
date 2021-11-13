import { noArrayArg } from "./no-array-arg";
import { noGet } from "./no-get";
import { noSet } from "./no-set";
import { noUnfreeze } from "./no-unfreeze";
import { o } from "@skylib/functions";
import { preferAssign } from "./prefer-assign";
import { preferClone } from "./prefer-clone";
import { preferEntries } from "./prefer-entries";
import { preferGetPrototypeOf } from "./prefer-getPrototypeOf";
import { preferHasOwnProp } from "./prefer-hasOwnProp";
import { preferKeys } from "./prefer-keys";
import { preferValues } from "./prefer-values";

export const object = o.prefixKeys(
  {
    "no-array-arg": noArrayArg,
    "no-get": noGet,
    "no-set": noSet,
    "no-unfreeze": noUnfreeze,
    "prefer-assign": preferAssign,
    "prefer-clone": preferClone,
    "prefer-entries": preferEntries,
    "prefer-getPrototypeOf": preferGetPrototypeOf,
    "prefer-hasOwnProp": preferHasOwnProp,
    "prefer-keys": preferKeys,
    "prefer-values": preferValues
  },
  "object/"
);
