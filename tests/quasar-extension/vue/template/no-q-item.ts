import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/template/no-q-item"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-q-item", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <q-item />
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
