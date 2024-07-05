import type { InvalidTestCase as BaseInvalidTestCase, TestCaseError as BaseTestCaseError, ValidTestCase as BaseValidTestCase, RuleModule } from "@typescript-eslint/utils/dist/ts-eslint";
import type { Rec, unknowns } from "typescript-misc";
/**
 * Extracts MessageId from rule.
 * @param rule - Rule.
 * @returns MessageId.
 */
export declare function getMessageId<T extends string>(rule: RuleModule<T, unknowns>): Rec<T, T>;
/**
 * Runs test.
 * @param name - Name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
export declare function testRule<K extends string, M extends string, O extends unknowns>(name: K, rule: RuleModule<M, O>, invalid: InvalidTestCases<M, O>, valid?: ValidTestCases<O>): void;
export type Filename = "camelCase.camelCase.ts" | "camelCase.ts" | "kebab-case.kebab-case.ts" | "kebab-case.ts" | "kebab-PascalCase.ts" | "PascalCase.PascalCase.ts" | "PascalCase.ts" | "subfolder/index.ts";
export interface InvalidTestCase<M extends string, O extends unknowns> extends BaseInvalidTestCase<M, O> {
    readonly errors: TestCaseErrors<M>;
    readonly filename?: Filename;
    readonly name: string;
}
export type InvalidTestCases<M extends string, O extends unknowns> = ReadonlyArray<InvalidTestCase<M, O>>;
export interface TestCaseError<T extends string> extends BaseTestCaseError<T> {
    readonly line: number;
}
export type TestCaseErrors<T extends string> = ReadonlyArray<TestCaseError<T>>;
export interface ValidTestCase<O extends unknowns> extends BaseValidTestCase<O> {
    readonly filename?: Filename;
    readonly name: string;
}
export type ValidTestCases<O extends unknowns> = ReadonlyArray<ValidTestCase<O>>;
//# sourceMappingURL=test.d.ts.map