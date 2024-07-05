"use strict";
/* eslint-disable no-sync -- Ok */
/* eslint-disable security/detect-non-literal-fs-filename -- Ok */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRule = createRule;
exports.getProjectConfig = getProjectConfig;
const tslib_1 = require("tslib");
const typescript_misc_1 = require("typescript-misc");
const misc_1 = require("./misc");
const types_1 = require("./types");
const utils_1 = require("@typescript-eslint/utils");
const TypeCheck_1 = require("./TypeCheck");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
/**
 * Creates rule listener.
 * @param options - Options.
 * @returns Rule listener.
 */
function createRule(options) {
    const { create, defaultOptions, defaultSuboptions, docs: rawDocs, fixable, hasSuggestions, messages, suboptionsKey } = options;
    const docs = {
        recommended: "recommended",
        requiresTypeChecking: true,
        ...typescript_misc_1.o.removeUndefinedKeys.alt({
            ...rawDocs,
            defaultOptions,
            defaultSuboptions,
            description: typescript_misc_1.s.unpadMultiline(rawDocs.description),
            failExamples: typescript_misc_1.s.unpadMultiline(rawDocs.failExamples),
            passExamples: typescript_misc_1.s.unpadMultiline(rawDocs.passExamples),
            suboptionsKey
        })
    };
    const ruleCreator = utils_1.ESLintUtils.RuleCreator((name) => `https://iliubinskii.github.io/eslint-plugin-misc/${name}.html`);
    return ruleCreator({
        create: (rawContext, rawOptions) => {
            const context = createContext(rawContext, rawOptions, options);
            const typeCheck = (0, typescript_misc_1.classToInterface)(new TypeCheck_1.TypeCheck(rawContext));
            return create(context, typeCheck);
        },
        defaultOptions: [{ ...defaultOptions }],
        meta: {
            docs,
            messages,
            schema: { type: "array" },
            type: "suggestion",
            ...typescript_misc_1.o.removeUndefinedKeys.alt({ fixable, hasSuggestions })
        },
        name: options.name
    });
}
/**
 * Parses package.json file.
 * @param path - Path.
 * @returns Project configuration.
 */
function getProjectConfig(path = "package.json") {
    if (node_fs_1.default.existsSync(path)) {
        const result = typescript_misc_1.json.decode(node_fs_1.default.readFileSync(path).toString());
        if (isProjectConfig(result))
            return result;
    }
    return {};
}
const isSharedSuboptions = typescript_misc_1.is.object.factory({}, { filesToLint: typescript_misc_1.is.strings, filesToSkip: typescript_misc_1.is.strings });
/**
 * Determines if file should be linted.
 * @param path - Path.
 * @param options - Options.
 * @returns _True_ if file should be linted, _false_ otherwise.
 */
function shouldBeLinted(path, options) {
    const matcher = (0, misc_1.createFileMatcher)({ allow: options.filesToLint ?? [], disallow: options.filesToSkip ?? [] }, false, { dot: true, matchBase: true });
    const disallow = matcher(stripBase(typescript_misc_1.s.path.canonicalize(path), "./"));
    return !disallow;
}
/**
 * Strips base path.
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
function stripBase(path, replacement = "") {
    typescript_misc_1.assert.toBeTrue(typescript_misc_1.s.path.canonicalize(path).startsWith(misc_1.projectRoot), `Expecting path to be inside project folder: ${path}`);
    return `${replacement}${path.slice(misc_1.projectRoot.length)}`;
}
const isProjectConfig = typescript_misc_1.is.factory(typescript_misc_1.is.object.of, {}, { name: typescript_misc_1.is.string });
/**
 * Creates context.
 * @param context - Raw context.
 * @param ruleOptionsArray - Rule options.
 * @param options - Options.
 * @returns Context.
 */
function createContext(context, ruleOptionsArray, options) {
    const filename = context.getFilename();
    const projectConfig = getProjectConfig();
    const source = context.getSourceCode();
    const code = source.getText();
    return {
        eol: typescript_misc_1.s.detectEol(code),
        filename,
        getCommentRanges,
        getComments: node => getCommentRanges(node).map(range => code.slice(...range)),
        getFullRange,
        getFullText: node => code.slice(...getFullRange(node)),
        getLeadingSpaces: node => {
            const end = getFullRange(node)[0];
            const pos = code.slice(0, end).trimEnd().length;
            return [pos, end];
        },
        getLoc: (range) => {
            return {
                end: source.getLocFromIndex(range[1]),
                start: source.getLocFromIndex(range[0])
            };
        },
        getText,
        hasComments: node => getCommentRanges(node).length > 0,
        hasTrailingComment: node => code.slice(node.range[1]).trimStart().startsWith("//"),
        identifierFromPath,
        isAdjacentNodes: (node1, node2) => {
            if (node1.parent === node2.parent) {
                const pos = node1.range[1];
                const end = getFullRange(node2)[0];
                if (pos <= end)
                    return ["", ","].includes(code.slice(pos, end).trim());
            }
            return false;
        },
        locZero: {
            end: source.getLocFromIndex(0),
            start: source.getLocFromIndex(0)
        },
        normalizeSource: src => typescript_misc_1.s.path.canonicalize((0, typescript_misc_1.evaluate)(() => {
            if (src === "@") {
                typescript_misc_1.assert.not.empty(projectConfig.name, "Missing package name");
                return `${projectConfig.name}/src`;
            }
            if (src.startsWith("@/")) {
                typescript_misc_1.assert.not.empty(projectConfig.name, "Missing package name");
                return `${projectConfig.name}/src/${src.slice(2)}`;
            }
            if (src === "." ||
                src === ".." ||
                src.startsWith("./") ||
                src.startsWith("../")) {
                typescript_misc_1.assert.not.empty(projectConfig.name, "Missing package name");
                const path = node_path_1.default.join(node_path_1.default.dirname(filename), src);
                return `${projectConfig.name}/${stripBase(path)}`;
            }
            return src;
        })),
        options: (0, typescript_misc_1.evaluate)(() => {
            const { defaultSuboptions, isOptions, isSuboptions, suboptionsKey } = {
                isOptions: typescript_misc_1.is.unknown,
                ...options
            };
            const rawRuleOptions = ruleOptionsArray[0];
            typescript_misc_1.assert.byGuard(rawRuleOptions, isOptions, "Expecting valid rule options");
            const result = defaultSuboptions || isSuboptions || typescript_misc_1.is.not.empty(suboptionsKey)
                ? (0, typescript_misc_1.evaluate)(() => {
                    typescript_misc_1.assert.not.empty(isSuboptions, "Expecting suboptions guard");
                    typescript_misc_1.assert.not.empty(suboptionsKey, "Expecting suboptions key");
                    const suboptionsArray = typescript_misc_1.o.get(rawRuleOptions, suboptionsKey) ?? [];
                    typescript_misc_1.assert.array.of(suboptionsArray, typescript_misc_1.is.object, "Expecting valid rule options");
                    const suboptionsArrayWithDefaults = suboptionsArray.map((suboptions) => {
                        return {
                            ...defaultSuboptions,
                            ...suboptions
                        };
                    });
                    const isSuboptionsWithShared = typescript_misc_1.is.and.factory(isSharedSuboptions, isSuboptions);
                    typescript_misc_1.assert.array.of(suboptionsArrayWithDefaults, isSuboptionsWithShared, "Expecting valid rule options");
                    const ruleOptionsWithSuboptions = {
                        ...rawRuleOptions,
                        [suboptionsKey]: suboptionsArrayWithDefaults.filter(suboptions => shouldBeLinted(filename, suboptions))
                    };
                    return ruleOptionsWithSuboptions;
                })
                : rawRuleOptions;
            return result;
        }),
        rawContext: context,
        report: context.report.bind(context),
        stripExtension,
        textFromPath
    };
    function getCommentRanges(node) {
        return source.getCommentsBefore(node).map(comment => comment.range);
    }
    function getFullRange(node) {
        return [
            Math.min(node.range[0], ...getCommentRanges(node).map(range => range[0])),
            node.range[1]
        ];
    }
    function getText(mixed) {
        if (typescript_misc_1.is.number(mixed))
            return code.slice(mixed);
        if (typescript_misc_1.is.array(mixed))
            return code.slice(...mixed);
        return code.slice(...mixed.range);
    }
    function identifierFromPath(path, expected) {
        const { base, dir } = node_path_1.default.parse(path);
        const name = stripExtension(base);
        if (name === "index")
            return identifierFromPath(dir, expected);
        const candidates = typescript_misc_1.a
            .omit(name.split("."), (part, index) => index === 0 && part === "index")
            .map(part => (0, misc_1.setCasing)(part, /^[A-Z]/u.test(part) ? types_1.Casing.pascalCase : types_1.Casing.camelCase));
        return typescript_misc_1.is.not.empty(expected) && candidates.includes(expected)
            ? expected
            : typescript_misc_1.a.first(candidates);
    }
    function stripExtension(str) {
        for (const ext of [".js", ".jsx", ".ts", ".tsx"])
            if (str.endsWith(ext))
                return str.slice(0, -ext.length);
        return str;
    }
    function textFromPath(path, expected, format) {
        const { base, dir } = node_path_1.default.parse(path);
        const name = stripExtension(base);
        if (name === "index")
            return textFromPath(dir, expected, format);
        const candidates = name
            .split(".")
            .filter((part, index) => !(index === 0 && part === "index"))
            .map(part => (0, misc_1.setCasing)(part, format));
        return candidates.includes(expected) ? expected : typescript_misc_1.a.first(candidates);
    }
}
//# sourceMappingURL=create-rule.js.map