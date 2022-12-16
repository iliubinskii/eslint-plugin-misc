import type { Context, Docs, SuboptionsArray } from "./types";
import type { Rec, unknowns } from "type-essentials";
import type { RuleContext, RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
import { is } from "real-fns";
import type { ClassToInterface } from "real-fns";
import type { TypeCheck } from "./TypeCheck";
export declare const isProjectConfig: is.Guard<ProjectConfig>;
/**
 * Creates context.
 *
 * @param context - Raw context.
 * @param ruleOptionsArray - Rule options.
 * @param options - Options.
 * @returns Context.
 */
export declare function createContext<M extends string, O extends object, S extends object, K extends string = never>(context: RuleContext<M, unknowns>, ruleOptionsArray: unknowns, options: CreateRuleOptions<M, O, S, K>): Context<M, O, S, K>;
/**
 * Parses package.json file.
 *
 * @param path - Path.
 * @returns Project configuration.
 */
export declare function getProjectConfig(path?: string): ProjectConfig;
export type ContextOptionsArray = readonly [object];
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
    readonly isOptions?: is.Guard<O>;
    readonly isSuboptions?: is.Guard<S>;
    readonly messages: Rec<M, string>;
    readonly name: string;
    readonly suboptionsKey?: K;
    readonly vue: boolean;
}
export type PartialOptions<O extends object, S extends object, K extends string = never> = Partial<O> & {
    readonly [L in K]?: SuboptionsArray<Partial<S>>;
};
export type PartialOptionsArray<O extends object, S extends object, K extends string = never> = readonly [PartialOptions<O, S, K>];
export interface ProjectConfig {
    readonly name?: string;
}
//# sourceMappingURL=create-rule.internal.d.ts.map