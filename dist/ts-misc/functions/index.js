"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functions = void 0;
const array_1 = require("./array");
const converters_1 = require("./converters");
const guards_1 = require("./guards");
const json_1 = require("./json");
const no_evaluate_type_param_1 = require("./no-evaluate-type-param");
const real_fns_1 = require("real-fns");
const object_1 = require("./object");
const prefer_defineFn_1 = require("./prefer-defineFn");
const prefer_evaluate_1 = require("./prefer-evaluate");
const prefer_readonly_map_1 = require("./prefer-readonly-map");
const prefer_readonly_set_1 = require("./prefer-readonly-set");
const require_jsdoc_1 = require("./require-jsdoc");
const require_return_in_defineFn_1 = require("./require-return-in-defineFn");
exports.functions = real_fns_1.o.prefixKeys(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ "no-evaluate-type-param": no_evaluate_type_param_1.noEvaluateTypeParam, "prefer-defineFn": prefer_defineFn_1.preferDefineFn, "prefer-evaluate": prefer_evaluate_1.preferEvaluate, "prefer-readonly-map": prefer_readonly_map_1.preferReadonlyMap, "prefer-readonly-set": prefer_readonly_set_1.preferReadonlySet, "require-jsdoc": require_jsdoc_1.requireJsdoc, "require-return-in-defineFn": require_return_in_defineFn_1.requireReturnInDefineFn }, array_1.array), converters_1.converters), guards_1.guards), json_1.json), object_1.object), "functions/");
//# sourceMappingURL=index.js.map