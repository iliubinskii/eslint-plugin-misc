import * as utils from "../../utils";
import {
  Style,
  Target
  // eslint-disable-next-line misc/no-relative-parent-import -- Ok
} from "../../core/base/consistent-optional-props";
import { core } from "../../core";

export const consistentOptionalProps = utils.wrapRule({
  rule: core["consistent-optional-props"],
  options: [
    {
      overrides: [
        {
          _id: "Props",
          pattern: "^(?:Props|OwnProps)$",
          style: Style.combined,
          target: Target.interfaces
        },
        {
          _id: "Props.event",
          pattern: "^(?:Props|OwnProps)$",
          propertyPattern: "^on[A-Z]",
          style: Style.optional,
          target: Target.interfaces
        },
        {
          _id: "Slots",
          pattern: "^(?:Slots|OwnSlots)$",
          style: Style.combined,
          target: Target.interfaces
        },
        {
          _id: "Slots.event",
          pattern: "^(?:Slots|OwnSlots)$",
          propertyPattern: "^on[A-Z]",
          style: Style.optional,
          target: Target.interfaces
        }
      ]
    }
  ]
});
