import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-restricted-syntax"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-restricted-syntax", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "Identifier" }],
    code: "const id1 = [];",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "This syntax is not allowed: Identifier" }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        replacement: "id2",
        selector: ["Identifier[name=id1]", "Identifier[name=id2]"]
      }
    ],
    code: "const id1 = [];",
    output: "const id2 = [];",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: {
          _id: "id",
          message:
            "This syntax is not allowed: Identifier[name=id1], Identifier[name=id2]"
        }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        message: "Custom message",
        replacement: "e",
        search: /d/u.source,
        selector: "Identifier"
      }
    ],
    code: "const id1 = [];",
    output: "const ie1 = [];",
    errors: [
      {
        line: 1,
        messageId: MessageId.customMessage,
        data: { message: "Custom message" }
      }
    ]
  }
]);
