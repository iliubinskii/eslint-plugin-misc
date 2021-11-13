import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/object/no-array-arg"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-array-arg", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      o.entries([]);
      o.keys([]);
      o.values([]);
      o.entries({});
      o.keys({});
      o.values({});
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage }
    ]
  }
]);
