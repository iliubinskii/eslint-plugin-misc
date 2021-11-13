import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["typescript/no-this-void"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-this-void", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: "class C { f(this: void) {} }",
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
