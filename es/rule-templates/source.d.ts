import type { RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import type { TSESTree } from "@typescript-eslint/utils";
export declare enum Type {
    export = "export",
    import = "import"
}
export declare const create: ((callback: Callback) => RuleListener) & Readonly<{
    Type: typeof Type;
}>;
export interface Callback {
    /**
     * Callback.
     * @param ctx - Context.
     */
    (ctx: Ctx): void;
}
export interface Ctx {
    readonly node: TSESTree.Node;
    readonly source: string;
    readonly type: Type;
}
//# sourceMappingURL=source.d.ts.map