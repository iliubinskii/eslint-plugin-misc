import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/template/no-q-knob"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-q-knob", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <q-knob />
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
