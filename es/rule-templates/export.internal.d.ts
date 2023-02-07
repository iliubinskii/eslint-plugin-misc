import type * as utils from "../utils";
export interface Callback {
    /**
     * Callback.
     *
     * @param ctx - Context.
     */
    (ctx: Ctx): void;
}
export interface Ctx {
    readonly exportAllDeclarations: utils.TSESTree.ExportAllDeclarations;
    readonly exportDeclarations: utils.TSESTree.ExportDeclarations;
    readonly exportDefaultDeclarations: utils.TSESTree.ExportDefaultDeclarations;
    readonly exportNamedDeclarations: utils.TSESTree.ExportNamedDeclarations;
    readonly identifiers: utils.TSESTree.Identifiers;
    readonly onlyExport: boolean;
}
//# sourceMappingURL=export.internal.d.ts.map