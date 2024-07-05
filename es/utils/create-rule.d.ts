import type { ClassToInterface, Rec } from "typescript-misc";
import type { Context, Docs, SuboptionsArray } from "./types";
import type { RuleListener, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "typescript-misc";
import { TypeCheck } from "./TypeCheck";
/**
 * Creates rule listener.
 *
 * @param options - Options.
 * @returns Rule listener.
 */
export declare function createRule<M extends string, O extends object, S extends object, K extends string = never>(options: CreateRuleOptions<M, O, S, K>): RuleModule<M, PartialOptionsArray<O, S, K>>;
/**
 * Parses package.json file.
 *
 * @param path - Path.
 * @returns Project configuration.
 */
export declare function getProjectConfig(path?: string): ProjectConfig;
export interface CreateRuleOptions<M extends string, O extends object, S extends object, K extends string = never> {
    /**
     * Creates rule listener.
     *
     * @param context - Context.
     * @param typeCheck - Type check.
     * @returns Rule listener.
     */
    readonly create: (context: Context<M, O, S, K>, typeCheck: ClassToInterface<TypeCheck>) => RuleListener;
    readonly defaultOptions?: Readonly<Partial<O>>;
    readonly defaultSuboptions?: Readonly<Partial<S>>;
    readonly docs: Docs<keyof O, keyof S>;
    readonly fixable?: "code" | "whitespace";
    readonly hasSuggestions?: boolean;
    readonly isOptions?: is.Guard<O>;
    readonly isSuboptions?: is.Guard<S>;
    readonly messages: Rec<M, string>;
    readonly name: string;
    readonly suboptionsKey?: K;
}
export type PartialOptions<O extends object, S extends object, K extends string = never> = Partial<O> & {
    readonly [L in K]?: SuboptionsArray<Partial<S>>;
};
export type PartialOptionsArray<O extends object, S extends object, K extends string = never> = readonly [PartialOptions<O, S, K>];
interface ProjectConfig {
    readonly name?: string;
}
export {};
//# sourceMappingURL=create-rule.d.ts.map