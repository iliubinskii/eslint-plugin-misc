import type { TSESTree } from "@typescript-eslint/utils";
export declare enum Type {
    export = "export",
    import = "import"
}
export interface Callback {
    /**
     * Callback.
     *
     * @param ctx - Context.
     */
    (ctx: Ctx): void;
}
export interface Ctx {
    readonly node: TSESTree.Node;
    readonly source: string;
    readonly type: Type;
}
//# sourceMappingURL=source.internal.d.ts.map