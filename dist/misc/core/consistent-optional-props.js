"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentOptionalProps = exports.isTarget = exports.isStyle = exports.Target = exports.Style = exports.MessageId = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../../utils"));
const functions_1 = require("@skylib/functions");
const utils_1 = require("@typescript-eslint/utils");
var MessageId;
(function (MessageId) {
    MessageId["combined"] = "combined";
    MessageId["combinedId"] = "combinedId";
    MessageId["optional"] = "optional";
    MessageId["optionalId"] = "optionalId";
    MessageId["undefined"] = "undefined";
    MessageId["undefinedId"] = "undefinedId";
})(MessageId = exports.MessageId || (exports.MessageId = {}));
var Style;
(function (Style) {
    Style["combined"] = "combined";
    Style["optional"] = "optional";
    Style["undefined"] = "undefined";
})(Style = exports.Style || (exports.Style = {}));
var Target;
(function (Target) {
    Target["classes"] = "classes";
    Target["interfaces"] = "interfaces";
})(Target = exports.Target || (exports.Target = {}));
exports.isStyle = functions_1.is.factory(functions_1.is.enumeration, Style);
exports.isTarget = functions_1.is.factory(functions_1.is.enumeration, Target);
exports.consistentOptionalProps = utils.createRule({
    name: "consistent-optional-props",
    vue: false,
    isOptions: functions_1.is.object.factory({ classes: exports.isStyle, interfaces: exports.isStyle }, {}),
    defaultOptions: { classes: Style.combined, interfaces: Style.combined },
    isSuboptions: functions_1.is.object.factory({
        _id: functions_1.is.string,
        pattern: utils.isRegexpPattern,
        propertyPattern: utils.isRegexpPattern,
        style: exports.isStyle
    }, { target: exports.isTarget }),
    defaultSuboptions: { pattern: [], propertyPattern: [] },
    suboptionsKey: "overrides",
    messages: {
        [MessageId.combined]: 'Use "x?: T | undefined" style instead',
        [MessageId.combinedId]: 'Use "x?: T | undefined" style instead ({{_id}})',
        [MessageId.optional]: 'Use "x?: T" style instead',
        [MessageId.optionalId]: 'Use "x?: T" style instead ({{_id}})',
        [MessageId.undefined]: 'Use "x: T | undefined" style instead',
        [MessageId.undefinedId]: 'Use "x: T | undefined" style instead ({{_id}})'
    },
    docs: {
        description: `
      Ensures consistent optional property style:
      - Combined syntax: "x?: T \\| undefined"
      - Only optional syntax: "x?: T"
      - Only undefined syntax: "x: T \\| undefined"
    `,
        optionTypes: {
            classes: '"combined" | "optional" | "undefined"',
            interfaces: '"combined" | "optional" | "undefined"'
        },
        optionDescriptions: {
            classes: "Prefered style for classes",
            interfaces: "Prefered style for interfaces"
        },
        suboptionTypes: {
            _id: "string",
            pattern: "string | string[]",
            propertyPattern: "string | string[]",
            style: '"combined" | "optional" | "undefined"',
            target: '"classes" | "interfaces"'
        },
        suboptionDescriptions: {
            _id: "Id",
            pattern: "Only for selected class/interface names (regular expression)",
            propertyPattern: "Only for selected property names (regular expression)",
            style: "Prefered style",
            target: "Classes or interfaces"
        },
        failExamples: `
      interface I {
        x?: string;
        y: string | undefined;
      }
    `,
        passExamples: `
      interface I {
        x?: string | undefined;
        y?: string | undefined;
      }
    `
    },
    create: (context, typeCheck) => {
        const overrides = functions_1.a
            .reverse(context.options.overrides)
            .map((override) => {
            const { pattern, propertyPattern } = override;
            const matcher = utils.createRegexpMatcher(pattern, true);
            const properyMatcher = utils.createRegexpMatcher(propertyPattern, true);
            return Object.assign(Object.assign({}, override), { matcher, properyMatcher });
        });
        return {
            ClassDeclaration: lintClass,
            ClassExpression: lintClass,
            TSInterfaceDeclaration: lintInterface
        };
        function getPropertyName(node) {
            return utils.nodeText(node.key, () => context.getText(node.key));
        }
        function lintClass(node) {
            const name = node.id ? node.id.name : "?";
            for (const property of node.body.body)
                if (property.type === utils_1.AST_NODE_TYPES.PropertyDefinition ||
                    property.type === utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition)
                    lintProperty(property, Target.classes, name);
        }
        function lintInterface(node) {
            const name = node.id.name;
            for (const property of node.body.body)
                if (property.type === utils_1.AST_NODE_TYPES.TSPropertySignature)
                    lintProperty(property, Target.interfaces, name);
        }
        function lintProperty(node, target, name) {
            if (node.typeAnnotation) {
                const { typeAnnotation } = node.typeAnnotation;
                const got = (0, functions_1.evaluate)(() => {
                    var _a;
                    const type = typeCheck.getType(typeAnnotation);
                    const hasUndefined = typeCheck.typeHas(type, utils.TypeGroup.undefined);
                    const optional = (_a = node.optional) !== null && _a !== void 0 ? _a : false;
                    if (hasUndefined && optional)
                        return Style.combined;
                    if (hasUndefined)
                        return Style.undefined;
                    if (optional)
                        return Style.optional;
                    return undefined;
                });
                if (got) {
                    const override = (0, functions_1.evaluate)(() => {
                        const propertyName = getPropertyName(node);
                        const targets = new functions_1.ReadonlySet([target, undefined]);
                        return overrides.find(candidate => targets.has(candidate.target) &&
                            candidate.matcher(name) &&
                            candidate.properyMatcher(propertyName));
                    });
                    const expected = (0, functions_1.evaluate)(() => {
                        const result = override ? override.style : context.options[target];
                        return exclusionTypes.has(typeAnnotation.type) &&
                            exclusionStyles.has(got) &&
                            exclusionStyles.has(result)
                            ? undefined
                            : result;
                    });
                    if (expected)
                        if (got === expected) {
                            // Valid
                        }
                        else
                            context.report({
                                data: override ? { _id: override._id } : {},
                                messageId: (0, functions_1.evaluate)(() => {
                                    switch (expected) {
                                        case Style.combined:
                                            return override
                                                ? MessageId.combinedId
                                                : MessageId.combined;
                                        case Style.optional:
                                            return override
                                                ? MessageId.optionalId
                                                : MessageId.optional;
                                        case Style.undefined:
                                            return override
                                                ? MessageId.undefinedId
                                                : MessageId.undefined;
                                    }
                                }),
                                node
                            });
                }
            }
        }
    }
});
const exclusionTypes = new functions_1.ReadonlySet([
    utils_1.AST_NODE_TYPES.TSAnyKeyword,
    utils_1.AST_NODE_TYPES.TSUnknownKeyword
]);
const exclusionStyles = new functions_1.ReadonlySet([Style.combined, Style.optional]);
//# sourceMappingURL=consistent-optional-props.js.map