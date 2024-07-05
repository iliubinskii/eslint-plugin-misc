"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeGroup = exports.Fixable = exports.Casing = void 0;
var Casing;
(function (Casing) {
    Casing["camelCase"] = "camelCase";
    Casing["kebabCase"] = "kebab-case";
    Casing["pascalCase"] = "PascalCase";
})(Casing || (exports.Casing = Casing = {}));
var Fixable;
(function (Fixable) {
    Fixable["code"] = "code";
    Fixable["whitespace"] = "whitespace";
})(Fixable || (exports.Fixable = Fixable = {}));
var TypeGroup;
(function (TypeGroup) {
    TypeGroup["any"] = "any";
    TypeGroup["array"] = "array";
    TypeGroup["arrayOrTuple"] = "arrayOrTuple";
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
})(TypeGroup || (exports.TypeGroup = TypeGroup = {}));
//# sourceMappingURL=misc.js.map