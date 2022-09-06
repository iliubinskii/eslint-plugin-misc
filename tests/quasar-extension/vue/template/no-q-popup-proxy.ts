import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/template/no-q-popup-proxy"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-q-popup-proxy", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <q-popup-proxy />
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
