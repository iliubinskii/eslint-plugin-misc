import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-index-import"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-index-import", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'import x from ".";',
    errors: [{ line: 1, messageId: MessageId.disallowedSource }]
  }
]);
