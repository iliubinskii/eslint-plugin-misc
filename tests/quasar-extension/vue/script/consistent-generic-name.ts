import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/vue/script/consistent-generic-name"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-generic-name", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      defineComponent({
        components: {
          "field": genericField<string>(),
          "e-field": genericField<string>(),
          "field__string": genericField<string>(),
          "e-field__string": genericField<string>()
        }
      });
    `,
    errors: [
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage },
      { line: 5, messageId: MessageId.customMessage }
    ]
  }
]);
