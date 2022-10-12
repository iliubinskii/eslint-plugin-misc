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
          readonly x: unknown;
        }

        const obj: SampleInterface = { x: 1 };

        export default defineComponent({
          setup: () => ({ obj })
        });
        </script>

        <template>
          <sample-component v-model="obj.x" />
        </template>
      `,
      errors: [{ line: 14, messageId: MessageId.noReadonlyProperty }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface ComputedRef<T>  {
          value: T;
        }

        interface SampleInterface {
          readonly x: unknown;
        }

        const obj: ComputedRef<SampleInterface> = { value: { x: 1 } };

        export default defineComponent({
          setup: () => { return { obj }; }
        });
        </script>

        <template>
          <sample-component v-model="obj.x" />
        </template>
      `,
      errors: [{ line: 18, messageId: MessageId.noReadonlyProperty }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface Ref<T>  {
          value: T;
        }

        interface SampleInterface {
          readonly x: unknown;
        }

        const obj: Ref<SampleInterface> = { value: { x: 1 } };

        export default defineComponent({
          setup: () => { return { obj }; }
        });
        </script>

        <template>
          <sample-component v-model="obj.x" />
        </template>
      `,
      errors: [{ line: 18, messageId: MessageId.noReadonlyProperty }]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface I {
          readonly x: J;
        }

        interface J {
          readonly y: unknown;
        }

        const obj: I = { x: { y: 1 } };

        export default defineComponent({
          setup: () => ({ obj })
        });
        </script>

        <template>
          <sample-component v-model="obj.x.y" />
        </template>
      `,
      errors: [{ line: 18, messageId: MessageId.noReadonlyProperty }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface SampleInterface {
          x: unknown;
        }

        const obj: SampleInterface = { x: 1 };

        export default defineComponent({
          setup: () => ({ obj })
        });
        </script>

        <template>
          <sample-component v-model="obj.x" />
        </template>
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface ComputedRef<T>  {
          value: T;
        }

        interface SampleInterface {
          x: unknown;
        }

        const obj: ComputedRef<SampleInterface> = { value: { x: 1 } };

        export default defineComponent({
          setup: () => { return { obj }; }
        });
        </script>

        <template>
          <sample-component v-model="obj.x" />
        </template>
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface Ref<T>  {
          value: T;
        }

        interface SampleInterface {
          x: unknown;
        }

        const obj: Ref<SampleInterface> = { value: { x: 1 } };

        export default defineComponent({
          setup: () => { return { obj }; }
        });
        </script>

        <template>
          <sample-component v-model="obj.x" />
        </template>
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface I {
          readonly x: J;
        }

        interface J {
          y: unknown;
        }

        const obj: I = { x: { y: 1 } };

        export default defineComponent({
          setup: () => ({ obj })
        });
        </script>

        <template>
          <sample-component v-model="obj.x.y" />
        </template>
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        interface Ref {}

        const obj: Ref = {};

        export default defineComponent({
          setup: () => { return { obj }; }
        });
        </script>

        <template>
          <sample-component v-model="obj.x" />
        </template>
      `
    }
  ]
);
