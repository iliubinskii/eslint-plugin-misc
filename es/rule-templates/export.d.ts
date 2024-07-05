import type * as utils from "../utils";
import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
/**
 * Creates rule listener.
 * @param callback - Callback.
 * @returns Rule listener.
 */
export declare function create(callback: Callback): RuleListener;
export interface Callback {
    /**
     * Callback.
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
//# sourceMappingURL=export.d.ts.map