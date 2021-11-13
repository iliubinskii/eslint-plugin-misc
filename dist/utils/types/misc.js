"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeGroup = exports.Fixable = exports.Casing = void 0;
var Casing;
(function (Casing) {
    Casing["camelCase"] = "camelCase";
    // eslint-disable-next-line @skylib/consistent-enum-members -- Ok
    Casing["kebabCase"] = "kebab-case";
    // eslint-disable-next-line @skylib/consistent-enum-members -- Ok
    Casing["pascalCase"] = "PascalCase";
})(Casing = exports.Casing || (exports.Casing = {}));
var Fixable;
(function (Fixable) {
    Fixable["code"] = "code";
    Fixable["whitespace"] = "whitespace";
})(Fixable = exports.Fixable || (exports.Fixable = {}));
var TypeGroup;
(function (TypeGroup) {
    TypeGroup["any"] = "any";
    TypeGroup["array"] = "array";
    TypeGroup["boolean"] = "boolean";
    TypeGroup["complex"] = "complex";
    TypeGroup["function"] = "function";
    TypeGroup["never"] = "never";
    TypeGroup["null"] = "null";
    TypeGroup["number"] = "number";
    TypeGroup["object"] = "object";
    TypeGroup["parameter"] = "parameter";
    TypeGroup["readonly"] = "readonly";
    TypeGroup["string"] = "string";
    TypeGroup["symbol"] = "symbol";
    TypeGroup["tuple"] = "tuple";
    TypeGroup["undefined"] = "undefined";
    TypeGroup["unknown"] = "unknown";
})(TypeGroup = exports.TypeGroup || (exports.TypeGroup = {}));
//# sourceMappingURL=misc.js.map