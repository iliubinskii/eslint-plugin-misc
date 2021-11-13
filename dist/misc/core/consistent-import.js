"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentImport = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const _ = tslib_1.__importStar(require("@skylib/lodash-commonjs-es"));
const utils = tslib_1.__importStar(require("../../utils"));
const utils_1 = require("@typescript-eslint/utils");
const functions_1 = require("@skylib/functions");
const minimatch_1 = tslib_1.__importDefault(require("minimatch"));
var MessageId;
(function (MessageId) {
    MessageId["autoImport"] = "autoImport";
    MessageId["invalidLocalName"] = "invalidLocalName";
    MessageId["wildcardDisallowed"] = "wildcardDisallowed";
    MessageId["wildcardRequired"] = "wildcardRequired";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
exports.consistentImport = utils.createRule({
    name: "consistent-import",
    fixable: utils.Fixable.code,
    vue: true,
    isSuboptions: functions_1.is.object.factory({
        _id: functions_1.is.string,
        altLocalNames: functions_1.is.strings,
        autoImport: functions_1.is.boolean,
        source: functions_1.is.string,
        wildcard: functions_1.is.boolean
    }, {
        autoImportSource: functions_1.is.string,
        localName: functions_1.is.string,
        sourcePattern: functions_1.is.string
    }),
    defaultSuboptions: { altLocalNames: [], autoImport: false, wildcard: false },
    suboptionsKey: "sources",
    messages: {
        [MessageId.autoImport]: 'Run "eslint --fix" to add missing import statement(s)',
        [MessageId.invalidLocalName]: "Expecting local name to be: {{expectedLocalName}} ({{_id}}, source: {{source}})",
        [MessageId.wildcardDisallowed]: "Wildcard import disallowed ({{_id}}, source: {{source}})",
        [MessageId.wildcardRequired]: "Wildcard import required ({{_id}}, source: {{source}})"
    },
    docs: {
        description: "Requires consistent import.",
        suboptionTypes: {
            _id: "string",
            altLocalNames: "string[]",
            autoImport: "boolean",
            autoImportSource: "string",
            localName: "string",
            source: "string",
            sourcePattern: "string",
            wildcard: "boolean"
        },
        suboptionDescriptions: {
            _id: "Id",
            altLocalNames: "Alternative local names",
            autoImport: "Enable auto-import",
            autoImportSource: 'Auto-import source (defaults to "source")',
            localName: "Local name",
            source: "Source",
            sourcePattern: "Soure pattern (minimatch)",
            wildcard: "Prefer wildcard import"
        },
        failExamples: `
      /*
      eslint @skylib/consistent-import: [
        error,
        {
          sources: [
            {
              _id: "catch-all",
              source: "**"
            },
            {
              _id: "source2",
              source: "source2",
              wildcard: true
            }
          ]
        }
      ]
      */
      import * as source1 from "source1"; // Wildcard import disallowed
      import { item1 } from "source2"; // Wildcard import required
      import * as invalidLocalName from "source2"; // Invalid local name
    `,
        passExamples: `
      /*
      eslint @skylib/consistent-import: [
        error,
        {
          sources: [
            {
              _id: "catch-all",
              source: "**"
            },
            {
              _id: "source2",
              source: "source2",
              wildcard: true
            }
          ]
        }
      ]
      */
      import { item1 } from "source1";
      import * as source2 from "source2";
    `
    },
    create: (context) => {
        const eol = context.eol;
        // eslint-disable-next-line @skylib/functions/prefer-ReadonlySet -- Ok
        const identifiers = new Set();
        const importDeclarations = [];
        return {
            ":not(ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier, Property) > Identifier": (node) => {
                identifiers.add(node.name);
            },
            "ExportAllDeclaration": node => {
                if (node.exported) {
                    const source = context.normalizeSource(node.source.value);
                    const suboptions = findSuboptions(source);
                    if (suboptions) {
                        const { _id, localName, wildcard } = suboptions;
                        if (wildcard)
                            if (node.exported.name === localName) {
                                // Valid name
                            }
                            else
                                context.report({
                                    data: { _id, expectedLocalName: localName, source },
                                    messageId: MessageId.invalidLocalName,
                                    node
                                });
                        else
                            context.report({
                                data: { _id, source },
                                messageId: MessageId.wildcardDisallowed,
                                node
                            });
                    }
                }
            },
            "ExportNamedDeclaration": node => {
                if (node.source) {
                    const source = context.normalizeSource(node.source.value);
                    const suboptions = findSuboptions(source);
                    if (suboptions) {
                        const { _id, localName, wildcard } = suboptions;
                        if (wildcard)
                            context.report({
                                data: { _id, source },
                                messageId: MessageId.wildcardRequired,
                                node
                            });
                        else {
                            const specifier = node.specifiers.find(candidate => candidate.local.name === "default");
                            if (specifier)
                                if (specifier.exported.name === localName) {
                                    // Valid name
                                }
                                else
                                    context.report({
                                        data: { _id, expectedLocalName: localName, source },
                                        messageId: MessageId.invalidLocalName,
                                        node
                                    });
                        }
                    }
                }
            },
            "ImportDeclaration": node => {
                importDeclarations.push(node);
            },
            "Program:exit": (node) => {
                lintAutoImport(node);
                lintConsistentImport();
            },
            "Property > Identifier.value": (node) => {
                identifiers.add(node.name);
            }
        };
        function expectedLocalName(localName, altLocalNames) {
            return identifiers.has(localName) && altLocalNames.length
                ? altLocalNames.join(", ")
                : localName;
        }
        function findSuboptions(source) {
            const suboptions = context.options.sources.find(candidate => {
                var _a;
                return (0, minimatch_1.default)(source, (_a = candidate.sourcePattern) !== null && _a !== void 0 ? _a : candidate.source, {
                    dot: true
                });
            });
            return suboptions
                ? Object.assign({ localName: context.identifierFromPath(source) }, suboptions) : undefined;
        }
        function lintAutoImport(node) {
            const fixes = _.uniq(context.options.sources.flatMap(suboptions => {
                const { autoImport, autoImportSource, localName, wildcard } = Object.assign({ autoImportSource: suboptions.source, localName: context.identifierFromPath(suboptions.source) }, suboptions);
                return autoImport
                    ? context.scope.through
                        .map(ref => {
                        if (ref.identifier.name === localName) {
                            context.report({
                                messageId: MessageId.autoImport,
                                node: ref.identifier
                            });
                            return wildcard
                                ? `import * as ${localName} from "${autoImportSource}";`
                                : `import ${localName} from "${autoImportSource}";`;
                        }
                        return undefined;
                    })
                        .filter(functions_1.is.not.empty)
                    : [];
            }));
            if (fixes.length)
                context.report({
                    fix: () => {
                        const fix = fixes.join(eol);
                        return {
                            range: [node.range[0], node.range[0]],
                            text: `${fix}${eol}`
                        };
                    },
                    loc: context.locZero,
                    messageId: MessageId.autoImport
                });
        }
        function lintConsistentImport() {
            for (const node of importDeclarations) {
                const source = context.normalizeSource(node.source.value);
                const suboptions = findSuboptions(source);
                if (suboptions) {
                    const { _id, altLocalNames, localName, wildcard } = suboptions;
                    const wildcardSpecifier = node.specifiers.find(candidate => candidate.type === utils_1.AST_NODE_TYPES.ImportNamespaceSpecifier);
                    const defaultSpecifier = node.specifiers.find(candidate => candidate.type === utils_1.AST_NODE_TYPES.ImportDefaultSpecifier);
                    if (wildcard)
                        if (wildcardSpecifier)
                            if (wildcardSpecifier.local.name === localName) {
                                // Valid name
                            }
                            else if (identifiers.has(localName) &&
                                altLocalNames.includes(wildcardSpecifier.local.name)) {
                                // Valid alt name
                            }
                            else
                                context.report({
                                    data: {
                                        _id,
                                        expectedLocalName: expectedLocalName(localName, altLocalNames),
                                        source
                                    },
                                    messageId: MessageId.invalidLocalName,
                                    node
                                });
                        else
                            context.report({
                                data: { _id, source },
                                messageId: MessageId.wildcardRequired,
                                node
                            });
                    else {
                        if (defaultSpecifier)
                            if (defaultSpecifier.local.name === localName) {
                                // Valid name
                            }
                            else if (identifiers.has(localName) &&
                                altLocalNames.includes(defaultSpecifier.local.name)) {
                                // Valid alt name
                            }
                            else
                                context.report({
                                    data: {
                                        _id,
                                        expectedLocalName: expectedLocalName(localName, altLocalNames),
                                        source
                                    },
                                    messageId: MessageId.invalidLocalName,
                                    node
                                });
                        if (wildcardSpecifier)
                            context.report({
                                data: { _id, source },
                                messageId: MessageId.wildcardDisallowed,
                                node
                            });
                    }
                }
            }
        }
    }
});
//# sourceMappingURL=consistent-import.js.map