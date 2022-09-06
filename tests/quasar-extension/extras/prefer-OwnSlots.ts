import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["quasar-extension/extras/prefer-OwnSlots"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "prefer-OwnSlots",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        interface Slots {
          x: string;
          y: string;
        }
      `,
      errors: [{ line: 1, endLine: 4, messageId: MessageId.customMessage }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: "interface Slots {}"
    }
  ]
);
