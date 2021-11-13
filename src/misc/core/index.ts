import { commentSpacing } from "./comment-spacing";
import { consistentEmptyLines } from "./consistent-empty-lines";
import { consistentEnumMembers } from "./consistent-enum-members";
import { consistentFilename } from "./consistent-filename";
import { consistentImport } from "./consistent-import";
import { consistentOptionalProps } from "./consistent-optional-props";
import { disallowImport } from "./disallow-import";
import { exportMatchingFilenameOnly } from "./export-matching-filename-only";
import { matchFilename } from "./match-filename";
import { noExpressionEmptyLines } from "./no-expression-empty-lines";
import { noRestrictedSyntax } from "./no-restricted-syntax";
import { noSelfImport } from "./no-self-import";
import { noSiblingImport } from "./no-sibling-import";
import { noUnnecessaryTemplateLiteral } from "./no-unnecessary-template-literal";
import { objectFormat } from "./object-format";
import { onlyExportName } from "./only-export-name";
import { preferOnlyExport } from "./prefer-only-export";
import { requireJsdoc } from "./require-jsdoc";
import { requireSyntax } from "./require-syntax";
import { sortArray } from "./sort-array";
import { sortClassMembers } from "./sort-class-members";
import { sortKeys } from "./sort-keys";
import { sortStatements } from "./sort-statements";
import { sortTopComments } from "./sort-top-comments";
import { switchCaseSpacing } from "./switch-case-spacing";
import { templateLiteralFormat } from "./template-literal-format";
import { wrap } from "./wrap";

export const core = {
  "comment-spacing": commentSpacing,
  "consistent-empty-lines": consistentEmptyLines,
  "consistent-enum-members": consistentEnumMembers,
  "consistent-filename": consistentFilename,
  "consistent-import": consistentImport,
  "consistent-optional-props": consistentOptionalProps,
  "disallow-import": disallowImport,
  "export-matching-filename-only": exportMatchingFilenameOnly,
  "match-filename": matchFilename,
  "no-expression-empty-lines": noExpressionEmptyLines,
  "no-restricted-syntax": noRestrictedSyntax,
  "no-self-import": noSelfImport,
  "no-sibling-import": noSiblingImport,
  "no-unnecessary-template-literal": noUnnecessaryTemplateLiteral,
  "object-format": objectFormat,
  "only-export-name": onlyExportName,
  "prefer-only-export": preferOnlyExport,
  "require-jsdoc": requireJsdoc,
  "require-syntax": requireSyntax,
  "sort-array": sortArray,
  "sort-class-members": sortClassMembers,
  "sort-keys": sortKeys,
  "sort-statements": sortStatements,
  "sort-top-comments": sortTopComments,
  "switch-case-spacing": switchCaseSpacing,
  "template-literal-format": templateLiteralFormat,
  wrap
} as const;
