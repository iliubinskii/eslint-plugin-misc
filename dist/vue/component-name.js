"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentName = void 0;
const tslib_1 = require("tslib");
const utils = tslib_1.__importStar(require("../utils"));
const misc_1 = require("../misc");
exports.componentName = utils.wrapRule({
    rule: misc_1.misc["match-filename"],
    options: [
        {
            format: utils.Casing.kebabCase,
            selector: "CallExpression[callee.name=defineComponent] > ObjectExpression > Property[key.name=name] > Literal.value"
        }
    ],
    docs: {
        description: "Requires using enums instead of string literals.",
        failExamples: `
      <!-- filename: SampleComponent.vue -->
      <script lang="ts">
        export default defineComponent({ name: "invalid-name" });
      </script>
    `,
        passExamples: `
      <!-- filename: SampleComponent.vue -->
      <script lang="ts">
        export default defineComponent({ name: "sample-component" });
      </script>
    `
    }
});
//# sourceMappingURL=component-name.js.map