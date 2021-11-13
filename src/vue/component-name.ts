import * as utils from "../utils";
import { misc } from "../misc";

export const componentName = utils.wrapRule({
  rule: misc["match-filename"],
  options: [
    {
      format: utils.Casing.kebabCase,
      selector:
        "CallExpression[callee.name=defineComponent] > ObjectExpression > Property[key.name=name] > Literal.value"
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
