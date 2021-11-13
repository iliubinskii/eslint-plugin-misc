import { checkPropsExtends } from "./check-Props-extends";
import { checkSlotsExtends } from "./check-Slots-extends";
import { noEmptyInterfaces } from "./no-empty-interfaces";
import { noOwnPropsExtends } from "./no-OwnProps-extends";
import { noOwnSlotsExtends } from "./no-OwnSlots-extends";
import { o } from "@skylib/functions";
import { preferOwnProps } from "./prefer-OwnProps";
import { preferOwnSlots } from "./prefer-OwnSlots";

export const extras = o.prefixKeys(
  {
    "check-Props-extends": checkPropsExtends,
    "check-Slots-extends": checkSlotsExtends,
    "no-OwnProps-extends": noOwnPropsExtends,
    "no-OwnSlots-extends": noOwnSlotsExtends,
    "no-empty-interfaces": noEmptyInterfaces,
    "prefer-OwnProps": preferOwnProps,
    "prefer-OwnSlots": preferOwnSlots
  },
  "extras/"
);
