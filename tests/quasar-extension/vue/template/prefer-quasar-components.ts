import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/template/prefer-quasar-components"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-quasar-components", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <e-form></e-form>
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
