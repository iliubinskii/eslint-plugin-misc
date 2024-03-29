import { base } from "./base";
import { classMatchFilename } from "./class-match-filename";
import { consistentSourceExtension } from "./consistent-source-extension";
import { consistentSymbolDescription } from "./consistent-symbol-description";
import { maxIdentifierBlocks } from "./max-identifier-blocks";
import { noAtSignImport } from "./no-at-sign-import";
import { noAtSignInternalImport } from "./no-at-sign-internal-import";
import { noChainCoalescenceMixture } from "./no-chain-coalescence-mixture";
import { noIndexImport } from "./no-index-import";
import { noInternalModules } from "./no-internal-modules";
import { noLanguageMixing } from "./no-language-mixing";
import { noNegatedConditions } from "./no-negated-conditions";
import { noNodejsModules } from "./no-nodejs-modules";
import { noParamReassign } from "./no-param-reassign";
import { noRelativeParentImport } from "./no-relative-parent-import";
import { noShadow } from "./no-shadow";
import { noUnderscoreExport } from "./no-underscore-export";
import { noUnnecessaryAsConst } from "./no-unnecessary-as-const";
import { noUnnecessaryBreak } from "./no-unnecessary-break";
import { noUnnecessaryInitialization } from "./no-unnecessary-initialization";
import { preferArrowFunctionProperty } from "./prefer-arrow-function-property";
import { preferConstRequire } from "./prefer-const-require";
import { restrictIdentifierCharacters } from "./restrict-identifier-characters";
import { sortCallSignature } from "./sort-call-signature";
import { sortConstructSignature } from "./sort-construct-signature";
export const core = {
    ...base,
    "class-match-filename": classMatchFilename,
    "consistent-source-extension": consistentSourceExtension,
    "consistent-symbol-description": consistentSymbolDescription,
    "max-identifier-blocks": maxIdentifierBlocks,
    "no-at-sign-import": noAtSignImport,
    "no-at-sign-internal-import": noAtSignInternalImport,
    "no-chain-coalescence-mixture": noChainCoalescenceMixture,
    "no-index-import": noIndexImport,
    "no-internal-modules": noInternalModules,
    "no-language-mixing": noLanguageMixing,
    "no-negated-conditions": noNegatedConditions,
    "no-nodejs-modules": noNodejsModules,
    "no-param-reassign": noParamReassign,
    "no-relative-parent-import": noRelativeParentImport,
    "no-shadow": noShadow,
    "no-underscore-export": noUnderscoreExport,
    "no-unnecessary-as-const": noUnnecessaryAsConst,
    "no-unnecessary-break": noUnnecessaryBreak,
    "no-unnecessary-initialization": noUnnecessaryInitialization,
    "prefer-arrow-function-property": preferArrowFunctionProperty,
    "prefer-const-require": preferConstRequire,
    "restrict-identifier-characters": restrictIdentifierCharacters,
    "sort-call-signature": sortCallSignature,
    "sort-construct-signature": sortConstructSignature
};
//# sourceMappingURL=index.js.map