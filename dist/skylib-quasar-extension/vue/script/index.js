"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.script = void 0;
const consistent_expose_arg_1 = require("./consistent-expose-arg");
const no_global_icons_1 = require("./no-global-icons");
const no_global_lang_1 = require("./no-global-lang");
const functions_1 = require("@skylib/functions");
const require_validateEmit_type_param_1 = require("./require-validateEmit-type-param");
const require_validateProps_type_param_1 = require("./require-validateProps-type-param");
exports.script = functions_1.o.prefixKeys({
    "consistent-expose-arg": consistent_expose_arg_1.consistentExposeArg,
    "no-global-icons": no_global_icons_1.noGlobalIcons,
    "no-global-lang": no_global_lang_1.noGlobalLang,
    "require-validateEmit-type-param": require_validateEmit_type_param_1.requireValidateEmitTypeParam,
    "require-validateProps-type-param": require_validateProps_type_param_1.requireValidatePropsTypeParam
}, "script/");
//# sourceMappingURL=index.js.map