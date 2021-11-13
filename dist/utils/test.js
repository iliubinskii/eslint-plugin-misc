"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRule = exports.getMessageId = void 0;
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
const misc_1 = require("./misc");
/**
 * Extracts MessageId from rule.
 *
 * @param rule - Rule.
 * @returns MessageId.
 */
function getMessageId(rule) {
    return functions_1.o.fromEntries.exhaustive(functions_1.o.keys(rule.meta.messages).map(key => [key, key]));
}
exports.getMessageId = getMessageId;
/**
 * Runs test.
 *
 * @param name - Name.
 * @param rule - Rule.
 * @param invalid - Invalid tests.
 * @param valid - Valid tests.
 */
function testRule(name, rule, invalid, valid = []) {
    const tester = new utils_1.TSESLint.RuleTester({
        parser: require.resolve("vue-eslint-parser"),
        parserOptions: {
            ecmaFeatures: { jsx: true },
            ecmaVersion: 2017,
            extraFileExtensions: [".vue"],
            parser: "@typescript-eslint/parser",
            project: "./tsconfig.json",
            sourceType: "module",
            tsconfigRootDir: `${misc_1.projectRoot}fixtures`
        }
    });
    tester.run(name, rule, {
        invalid: invalid.map((test) => {
            var _a, _b;
            return (Object.assign(Object.assign({}, test), { code: functions_1.s.unpadMultiline(test.code), errors: test.errors.map((error) => (Object.assign({ endLine: error.line }, error))), filename: `${misc_1.projectRoot}fixtures/${(_a = test.filename) !== null && _a !== void 0 ? _a : "file.ts"}`, output: functions_1.s.unpadMultiline((_b = test.output) !== null && _b !== void 0 ? _b : test.code) }));
        }),
        valid: valid.map((test) => {
            var _a;
            return (Object.assign(Object.assign({}, test), { code: functions_1.s.unpadMultiline(test.code), filename: `${misc_1.projectRoot}fixtures/${(_a = test.filename) !== null && _a !== void 0 ? _a : "file.ts"}` }));
        })
    });
}
exports.testRule = testRule;
//# sourceMappingURL=test.js.map