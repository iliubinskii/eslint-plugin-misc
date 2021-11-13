"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vue = void 0;
const component_name_1 = require("./component-name");
const core_1 = require("./core");
const no_complex_declarator_type_1 = require("./no-complex-declarator-type");
const no_complex_return_type_1 = require("./no-complex-return-type");
const no_empty_lines_1 = require("./no-empty-lines");
const functions_1 = require("@skylib/functions");
exports.vue = functions_1.o.prefixKeys(Object.assign(Object.assign({}, core_1.core), { "component-name": component_name_1.componentName, "no-complex-declarator-type": no_complex_declarator_type_1.noComplexDeclaratorType, "no-complex-return-type": no_complex_return_type_1.noComplexReturnType, "no-empty-lines": no_empty_lines_1.noEmptyLines }), "vue/");
//# sourceMappingURL=index.js.map