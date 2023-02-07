import { consistentExposeArg } from "./consistent-expose-arg";
import { consistentGenericName } from "./consistent-generic-name";
import { noGlobalIcons } from "./no-global-icons";
import { noGlobalLang } from "./no-global-lang";
import { o } from "real-fns";
import { requireValidateEmitTypeParam } from "./require-validateEmit-type-param";
import { requireValidatePropsTypeParam } from "./require-validateProps-type-param";
export const script = o.prefixKeys({
    "consistent-expose-arg": consistentExposeArg,
    "consistent-generic-name": consistentGenericName,
    "no-global-icons": noGlobalIcons,
    "no-global-lang": noGlobalLang,
    "require-validateEmit-type-param": requireValidateEmitTypeParam,
    "require-validateProps-type-param": requireValidatePropsTypeParam
}, "script/");
//# sourceMappingURL=index.js.map