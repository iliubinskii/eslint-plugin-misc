"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vue = void 0;
const base_1 = require("./base");
const component_name_1 = require("./component-name");
const no_complex_declarator_type_1 = require("./no-complex-declarator-type");
const no_complex_return_type_1 = require("./no-complex-return-type");
const real_fns_1 = require("real-fns");
exports.vue = real_fns_1.o.prefixKeys(Object.assign(Object.assign({}, base_1.base), { "component-name": component_name_1.componentName, "no-complex-declarator-type": no_complex_declarator_type_1.noComplexDeclaratorType, "no-complex-return-type": no_complex_return_type_1.noComplexReturnType }), "vue/");
//# sourceMappingURL=index.js.map