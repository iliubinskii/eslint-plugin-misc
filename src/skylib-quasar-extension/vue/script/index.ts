import { consistentExposeArg } from "./consistent-expose-arg";
import { noGlobalIcons } from "./no-global-icons";
import { noGlobalLang } from "./no-global-lang";
import { o } from "@skylib/functions";
import { requireValidateEmitTypeParam } from "./require-validateEmit-type-param";
import { requireValidatePropsTypeParam } from "./require-validateProps-type-param";

export const script = o.prefixKeys(
  {
    "consistent-expose-arg": consistentExposeArg,
    "no-global-icons": noGlobalIcons,
    "no-global-lang": noGlobalLang,
    "require-validateEmit-type-param": requireValidateEmitTypeParam,
    "require-validateProps-type-param": requireValidatePropsTypeParam
  },
  "script/"
);
