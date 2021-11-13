import { is } from "@skylib/functions";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
export interface Options {
    readonly blockOrder: StatementTypes;
    readonly moduleOrder: StatementTypes;
    readonly order: StatementTypes;
    readonly programOrder: StatementTypes;
}
export declare enum StatementType {
    DeclareGlobal = "DeclareGlobal",
    ExportAllDeclaration = "ExportAllDeclaration",
    ExportDeclaration = "ExportDeclaration",
    ExportDefaultDeclaration = "ExportDefaultDeclaration",
    ExportFunctionDeclaration = "ExportFunctionDeclaration",
    ExportTypeDeclaration = "ExportTypeDeclaration",
    ExportUnknown = "ExportUnknown",
    FunctionDeclaration = "FunctionDeclaration",
    ImportDeclaration = "ImportDeclaration",
    JestTest = "JestTest",
    TypeDeclaration = "TypeDeclaration",
    Unknown = "Unknown"
}
export declare const isStatementType: is.Guard<StatementType>;
export declare const isStatementTypes: is.Guard<readonly StatementType[]>;
export declare const sortStatements: import("@typescript-eslint/utils/dist/ts-eslint/Rule").RuleModule<import("../../utils/sort.internal").MessageId, import("../../utils/create-rule.internal").PartialOptionsArray<Options, object, never>, RuleListener>;
declare type StatementTypes = readonly StatementType[];
export {};
//# sourceMappingURL=sort-statements.d.ts.map