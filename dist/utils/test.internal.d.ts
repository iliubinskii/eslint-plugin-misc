import type { InvalidTestCase as BaseInvalidTestCase, TestCaseError as BaseTestCaseError, ValidTestCase as BaseValidTestCase } from "@typescript-eslint/utils/dist/ts-eslint";
import type { unknowns } from "@skylib/functions";
export declare type Filename = "camelCase.camelCase.ts" | "camelCase.ts" | "kebab-case.kebab-case.ts" | "kebab-case.ts" | "kebab-PascalCase.ts" | "PascalCase.PascalCase.ts" | "PascalCase.ts" | "subfolder/index.ts";
export interface InvalidTestCase<M extends string, O extends unknowns> extends BaseInvalidTestCase<M, O> {
    readonly errors: TestCaseErrors<M>;
    readonly filename?: Filename;
    readonly name: string;
}
export declare type InvalidTestCases<M extends string, O extends unknowns> = ReadonlyArray<InvalidTestCase<M, O>>;
export interface TestCaseError<T extends string> extends BaseTestCaseError<T> {
    readonly line: number;
}
export declare type TestCaseErrors<T extends string> = ReadonlyArray<TestCaseError<T>>;
export interface ValidTestCase<O extends unknowns> extends BaseValidTestCase<O> {
    readonly filename?: Filename;
    readonly name: string;
}
export declare type ValidTestCases<O extends unknowns> = ReadonlyArray<ValidTestCase<O>>;
//# sourceMappingURL=test.internal.d.ts.map