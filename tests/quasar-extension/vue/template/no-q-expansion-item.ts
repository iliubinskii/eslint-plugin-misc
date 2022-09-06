import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/template/no-q-expansion-item"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-q-expansion-item", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <q-expansion-item />
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
