import { checkPropsExtends } from "./check-Props-extends";
import { checkSlotsExtends } from "./check-Slots-extends";
import { consistentOptionalProps } from "./consistent-optional-props";
import { noEmptyInterfaces } from "./no-empty-interfaces";
import { noOwnPropsExtends } from "./no-OwnProps-extends";
import { noOwnSlotsExtends } from "./no-OwnSlots-extends";
import { o } from "real-fns";
import { preferOwnProps } from "./prefer-OwnProps";
import { preferOwnSlots } from "./prefer-OwnSlots";

export const extras = o.prefixKeys(
  {
    "check-Props-extends": checkPropsExtends,
    "check-Slots-extends": checkSlotsExtends,
    "consistent-optional-props": consistentOptionalProps,
    "no-OwnProps-extends": noOwnPropsExtends,
    "no-OwnSlots-extends": noOwnSlotsExtends,
    "no-empty-interfaces": noEmptyInterfaces,
    "prefer-OwnProps": preferOwnProps,
    "prefer-OwnSlots": preferOwnSlots
  },
  "extras/"
);
