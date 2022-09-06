import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["functions/types/no-Writable"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-Writable", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      type T1 = Writable<IndexedObject<string>>;
      type T2 = Writable<IndexedRecord<string>>;
      type T3 = Writable<PartialRecord<string>>;
      type T4 = Writable<Rec<string>>;
    `,
    errors: [
      { line: 1, messageId: MessageId.customMessage },
      { line: 2, messageId: MessageId.customMessage },
      { line: 3, messageId: MessageId.customMessage },
      { line: 4, messageId: MessageId.customMessage }
    ]
  }
]);
