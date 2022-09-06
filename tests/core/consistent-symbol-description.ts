import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["consistent-symbol-description"];

const MessageId = utils.getMessageId(rule);

utils.testRule("consistent-symbol-description", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = Symbol("PascalCase");
      const y = Symbol("kebab-case__kebab-case");
    `,
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
