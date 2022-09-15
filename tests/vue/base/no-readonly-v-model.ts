import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["vue/no-readonly-v-model"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "no-readonly-v-model",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface SampleInterface {
          readonly value: unknown;
        }

        const obj: SampleInterface = { value: 1 };

        export default defineComponent({
          setup: () => ({ obj })
        });
        </script>

        <template>
          <sample-component v-model="obj.value" />
        </template>
      `,
      errors: [{ line: 14, messageId: MessageId.noReadonlyProperty }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface SampleInterface {
          readonly value: unknown;
        }

        const obj: SampleInterface = { value: 1 };

        export default defineComponent({
          setup: () => { return { obj }; }
        });
        </script>

        <template>
          <sample-component v-model="obj.value" />
        </template>
      `,
      errors: [{ line: 14, messageId: MessageId.noReadonlyProperty }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface SampleInterface {
          value: unknown;
        }

        const obj: SampleInterface = { value: 1 };

        export default defineComponent({
          setup: () => ({ obj })
        });
        </script>

        <template>
          <sample-component v-model="obj.value" />
        </template>
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface SampleInterface {
          value: unknown;
        }

        const obj: SampleInterface = { value: 1 };

        export default defineComponent({
          setup: () => { return { obj }; }
        });
        </script>

        <template>
          <sample-component v-model="obj.value" />
        </template>
      `
    }
  ]
);
