import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/template/prefer-lang-var"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-lang-var", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <div title="Text"></div>
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
