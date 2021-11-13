import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/template/no-mixed-classes"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-mixed-classes", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <div :class="\`\${$style.x} y\`"></div>
      </template>
    `,
    errors: [{ line: 2, messageId: MessageId.customMessage }]
  }
]);
