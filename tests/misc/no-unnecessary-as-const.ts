import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-unnecessary-as-const"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-unnecessary-as-const", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = {} as const;
      const y: I = { value: 1 } as const;
      const z = { value: 1 } as const;
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage }
    ]
  }
]);
