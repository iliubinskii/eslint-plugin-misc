import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/no-ref-undefined"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-ref-undefined", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      ref(undefined);
      ref<stringU>();
      ref<string | undefined>();
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);
