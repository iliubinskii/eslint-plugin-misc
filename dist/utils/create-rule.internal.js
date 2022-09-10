"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectConfig = exports.createContext = exports.isProjectConfig = void 0;
const tslib_1 = require("tslib");
const real_fns_1 = require("real-fns");
const misc_1 = require("./misc");
const types_1 = require("./types");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
exports.isProjectConfig = real_fns_1.is.factory(real_fns_1.is.object.of, {}, { name: real_fns_1.is.string });
/**
 * Creates context.
 *
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
        eol: real_fns_1.s.detectEol(code),
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
        getLoc: (range) => ({
            end: source.getLocFromIndex(range[1]),
            start: source.getLocFromIndex(range[0])
        }),
        getText,
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
        normalizeSource: src => real_fns_1.s.path.canonicalize((0, real_fns_1.evaluate)(() => {
            if (src === "@") {
                real_fns_1.assert.not.empty(projectConfig.name, "Missing package name");
                return `${projectConfig.name}/src`;
            }
            if (src.startsWith("@/")) {
                real_fns_1.assert.not.empty(projectConfig.name, "Missing package name");
                return `${projectConfig.name}/src/${src.slice(2)}`;
            }
            if (src === "." ||
                src === ".." ||
                src.startsWith("./") ||
                src.startsWith("../")) {
                real_fns_1.assert.not.empty(projectConfig.name, "Missing package name");
                const path = node_path_1.default.join(node_path_1.default.dirname(filename), src);
                return `${projectConfig.name}/${stripBase(path)}`;
            }
            return src;
        })),
        options: (0, real_fns_1.evaluate)(() => {
            const { defaultSuboptions, isOptions, isSuboptions, suboptionsKey } = Object.assign({ isOptions: real_fns_1.is.unknown }, options);
            const rawRuleOptions = ruleOptionsArray[0];
            real_fns_1.assert.byGuard(rawRuleOptions, isOptions, "Expecting valid rule options");
            const result = defaultSuboptions || isSuboptions || real_fns_1.is.not.empty(suboptionsKey)
                ? (0, real_fns_1.evaluate)(() => {
                    var _a;
                    real_fns_1.assert.not.empty(isSuboptions, "Expecting suboptions guard");
                    real_fns_1.assert.not.empty(suboptionsKey, "Expecting suboptions key");
                    const suboptionsArray = (_a = real_fns_1.o.get(rawRuleOptions, suboptionsKey)) !== null && _a !== void 0 ? _a : [];
                    real_fns_1.assert.array.of(suboptionsArray, real_fns_1.is.object, "Expecting valid rule options");
                    const suboptionsArrayWithDefaults = suboptionsArray.map((suboptions) => (Object.assign(Object.assign({}, defaultSuboptions), suboptions)));
                    const isSuboptionsWithShared = real_fns_1.is.and.factory(isSharedSuboptions, isSuboptions);
                    real_fns_1.assert.array.of(suboptionsArrayWithDefaults, isSuboptionsWithShared, "Expecting valid rule options");
                    const ruleOptionsWithSuboptions = Object.assign(Object.assign({}, rawRuleOptions), { [suboptionsKey]: suboptionsArrayWithDefaults.filter(suboptions => shouldBeLinted(filename, suboptions)) });
                    return ruleOptionsWithSuboptions;
                })
                : rawRuleOptions;
            return result;
        }),
        rawContext: context,
        report: context.report.bind(context),
        scope: context.getScope(),
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
        if (real_fns_1.is.number(mixed))
            return code.slice(mixed);
        if (real_fns_1.is.array(mixed))
            return code.slice(...mixed);
        return code.slice(...mixed.range);
    }
    function identifierFromPath(path, expected) {
        const { base, dir } = node_path_1.default.parse(path);
        const name = stripExtension(base);
        if (name === "index")
            return identifierFromPath(dir, expected);
        const candidates = real_fns_1.a
            .omit(name.split("."), (part, index) => index === 0 && part === "index")
            .map(part => (0, misc_1.setCasing)(part, /^[A-Z]/u.test(part) ? types_1.Casing.pascalCase : types_1.Casing.camelCase));
        return real_fns_1.is.not.empty(expected) && candidates.includes(expected)
            ? expected
            : real_fns_1.a.first(candidates);
    }
    function stripExtension(str) {
        for (const ext of [".js", ".ts", ".vue"])
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
        return candidates.includes(expected) ? expected : real_fns_1.a.first(candidates);
    }
}
exports.createContext = createContext;
/**
 * Parses package.json file.
 *
 * @param path - Path.
 * @returns Project configuration.
 */
function getProjectConfig(path = "package.json") {
    if (node_fs_1.default.existsSync(path)) {
        const result = real_fns_1.json.decode(node_fs_1.default.readFileSync(path).toString());
        if ((0, exports.isProjectConfig)(result))
            return result;
    }
    return {};
}
exports.getProjectConfig = getProjectConfig;
const isSharedSuboptions = real_fns_1.is.object.factory({}, { filesToLint: real_fns_1.is.strings, filesToSkip: real_fns_1.is.strings });
/**
 * Determines if file should be linted.
 *
 * @param path - Path.
 * @param options - Options.
 * @returns _True_ if file should be linted, _false_ otherwise.
 */
function shouldBeLinted(path, options) {
    var _a, _b;
    const matcher = (0, misc_1.createFileMatcher)({ allow: (_a = options.filesToLint) !== null && _a !== void 0 ? _a : [], disallow: (_b = options.filesToSkip) !== null && _b !== void 0 ? _b : [] }, false, { dot: true, matchBase: true });
    const disallow = matcher(stripBase(real_fns_1.s.path.canonicalize(path), "./"));
    return !disallow;
}
/**
 * Strips base path.
 *
 * @param path - Path.
 * @param replacement - Replacement.
 * @returns Stripped path.
 */
function stripBase(path, replacement = "") {
    real_fns_1.assert.toBeTrue(real_fns_1.s.path.canonicalize(path).startsWith(misc_1.projectRoot), `Expecting path to be inside project folder: ${path}`);
    return `${replacement}${path.slice(misc_1.projectRoot.length)}`;
}
//# sourceMappingURL=create-rule.internal.js.map