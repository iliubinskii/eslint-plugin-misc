import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-multi-type-tuples"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-multi-type-tuples", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type T1 = [string, number];
      type T2 = [string, string];
    `,
    errors: [{ line: 1, messageId: MessageId.multiTypeTuple }]
  }
]);
