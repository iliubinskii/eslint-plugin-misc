import { noMixedClasses } from "./no-mixed-classes";
import { noQBtn } from "./no-q-btn";
import { noQCard } from "./no-q-card";
import { noQCardActions } from "./no-q-card-actions";
import { noQCardSection } from "./no-q-card-section";
import { noQExpansionItem } from "./no-q-expansion-item";
import { noQField } from "./no-q-field";
import { noQForm } from "./no-q-form";
import { noQInput } from "./no-q-input";
import { noQItem } from "./no-q-item";
import { noQKnob } from "./no-q-knob";
import { noQMenu } from "./no-q-menu";
import { noQOptionGroup } from "./no-q-option-group";
import { noQPopupProxy } from "./no-q-popup-proxy";
import { noQSelect } from "./no-q-select";
import { noQToggle } from "./no-q-toggle";
import { noQTooltip } from "./no-q-tooltip";
import { o } from "@skylib/functions";
import { preferLabelProp } from "./prefer-label-prop";
import { preferLangVar } from "./prefer-lang-var";

export const template = o.prefixKeys(
  {
    "no-mixed-classes": noMixedClasses,
    "no-q-btn": noQBtn,
    "no-q-card": noQCard,
    "no-q-card-actions": noQCardActions,
    "no-q-card-section": noQCardSection,
    "no-q-expansion-item": noQExpansionItem,
    "no-q-field": noQField,
    "no-q-form": noQForm,
    "no-q-input": noQInput,
    "no-q-item": noQItem,
    "no-q-knob": noQKnob,
    "no-q-menu": noQMenu,
    "no-q-option-group": noQOptionGroup,
    "no-q-popup-proxy": noQPopupProxy,
    "no-q-select": noQSelect,
    "no-q-toggle": noQToggle,
    "no-q-tooltip": noQTooltip,
    "prefer-label-prop": preferLabelProp,
    "prefer-lang-var": preferLangVar
  },
  "template/"
);
