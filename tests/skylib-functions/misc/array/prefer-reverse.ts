import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/array/prefer-reverse"];

const MessageId = utils.getMessageId(rule);

utils.testRule("prefer-reverse", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "[].reverse();",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: {
          message: 'Use "a.reverse" instead (avoid mutation side-effects)'
        }
      }
    ]
  }
]);
