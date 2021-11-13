import type { RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
import type { InvalidTestCases, ValidTestCases } from "./test.internal";
import type { Rec, unknowns } from "@skylib/functions";
/**
 * Extracts MessageId from rule.
 *
 * @param rule - Rule.
 * @returns MessageId.
 */
export declare function getMessageId<T extends string>(rule: RuleModule<T, unknowns>): Rec<T, T>;
/**
 * Runs test.
 *
 * @param name - Name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
export declare function testRule<K extends string, M extends string, O extends unknowns>(name: K, rule: RuleModule<M, O>, invalid: InvalidTestCases<M, O>, valid?: ValidTestCases<O>): void;
//# sourceMappingURL=test.d.ts.map