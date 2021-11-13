import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-unsafe-object-assign"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unsafe-object-assign", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = { value: 1 } as const;
      const y = { value: 1 };
      Object.assign(x, { value: 2 });
      Object.assign(y, { value: 2 });
    `,
    errors: [{ line: 3, messageId: MessageId.customMessage }]
  }
]);
