"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.core = void 0;
const base_1 = require("./base");
const class_match_filename_1 = require("./class-match-filename");
const consistent_source_extension_1 = require("./consistent-source-extension");
const consistent_symbol_description_1 = require("./consistent-symbol-description");
const max_identifier_blocks_1 = require("./max-identifier-blocks");
const no_at_sign_import_1 = require("./no-at-sign-import");
const no_at_sign_internal_import_1 = require("./no-at-sign-internal-import");
const no_chain_coalescence_mixture_1 = require("./no-chain-coalescence-mixture");
const no_index_import_1 = require("./no-index-import");
const no_internal_modules_1 = require("./no-internal-modules");
const no_language_mixing_1 = require("./no-language-mixing");
const no_negated_conditions_1 = require("./no-negated-conditions");
const no_nodejs_modules_1 = require("./no-nodejs-modules");
const no_param_reassign_1 = require("./no-param-reassign");
const no_relative_parent_import_1 = require("./no-relative-parent-import");
const no_shadow_1 = require("./no-shadow");
const no_underscore_export_1 = require("./no-underscore-export");
const no_unnecessary_as_const_1 = require("./no-unnecessary-as-const");
const no_unnecessary_break_1 = require("./no-unnecessary-break");
const no_unnecessary_initialization_1 = require("./no-unnecessary-initialization");
const prefer_arrow_function_property_1 = require("./prefer-arrow-function-property");
const prefer_const_require_1 = require("./prefer-const-require");
const restrict_identifier_characters_1 = require("./restrict-identifier-characters");
const sort_call_signature_1 = require("./sort-call-signature");
const sort_construct_signature_1 = require("./sort-construct-signature");
exports.core = {
    ...base_1.base,
    "class-match-filename": class_match_filename_1.classMatchFilename,
    "consistent-source-extension": consistent_source_extension_1.consistentSourceExtension,
    "consistent-symbol-description": consistent_symbol_description_1.consistentSymbolDescription,
    "max-identifier-blocks": max_identifier_blocks_1.maxIdentifierBlocks,
    "no-at-sign-import": no_at_sign_import_1.noAtSignImport,
    "no-at-sign-internal-import": no_at_sign_internal_import_1.noAtSignInternalImport,
    "no-chain-coalescence-mixture": no_chain_coalescence_mixture_1.noChainCoalescenceMixture,
    "no-index-import": no_index_import_1.noIndexImport,
    "no-internal-modules": no_internal_modules_1.noInternalModules,
    "no-language-mixing": no_language_mixing_1.noLanguageMixing,
    "no-negated-conditions": no_negated_conditions_1.noNegatedConditions,
    "no-nodejs-modules": no_nodejs_modules_1.noNodejsModules,
    "no-param-reassign": no_param_reassign_1.noParamReassign,
    "no-relative-parent-import": no_relative_parent_import_1.noRelativeParentImport,
    "no-shadow": no_shadow_1.noShadow,
    "no-underscore-export": no_underscore_export_1.noUnderscoreExport,
    "no-unnecessary-as-const": no_unnecessary_as_const_1.noUnnecessaryAsConst,
    "no-unnecessary-break": no_unnecessary_break_1.noUnnecessaryBreak,
    "no-unnecessary-initialization": no_unnecessary_initialization_1.noUnnecessaryInitialization,
    "prefer-arrow-function-property": prefer_arrow_function_property_1.preferArrowFunctionProperty,
    "prefer-const-require": prefer_const_require_1.preferConstRequire,
    "restrict-identifier-characters": restrict_identifier_characters_1.restrictIdentifierCharacters,
    "sort-call-signature": sort_call_signature_1.sortCallSignature,
    "sort-construct-signature": sort_construct_signature_1.sortConstructSignature
};
//# sourceMappingURL=index.js.map