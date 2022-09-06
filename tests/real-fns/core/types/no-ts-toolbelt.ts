import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/types/no-ts-toolbelt"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-ts-toolbelt", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: 'import { FilterKeys } from "ts-toolbelt/out/Object/FilterKeys";',
    errors: [{ line: 1, messageId: MessageId.customMessage }]
  }
]);
