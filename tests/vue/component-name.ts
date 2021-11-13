import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["vue/component-name"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "component-name",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      code: `
        <script lang="ts">
        export default defineComponent({ name: "invalid-name" });
        </script>
      `,
      errors: [
        {
          line: 2,
          messageId: MessageId.invalidText,
          data: { expected: "pascal-case" }
        }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      filename: "PascalCase.ts",
      code: `
        <script lang="ts">
        export default defineComponent({ name: "pascal-case" });
        </script>
      `
    }
  ]
);
