import type { CreateRuleOptions, PartialOptionsArray } from "./create-rule.internal";
import type { RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
/**
 * Creates rule listener.
 *
 * @param options - Options.
 * @returns Rule listener.
 */
export declare function createRule<M extends string, O extends object, S extends object, K extends string = never>(options: CreateRuleOptions<M, O, S, K>): RuleModule<M, PartialOptionsArray<O, S, K>>;
//# sourceMappingURL=create-rule.d.ts.map