import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["no-restricted-syntax"];

const MessageId = utils.getMessageId(rule);

utils.testRule("no-restricted-syntax", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "VElement[name=p]" }],
    code: `
      <template>
        <p>Text</p>
      </template>
    `,
    errors: [
      {
        line: 2,
        messageId: MessageId.customMessage,
        data: {
          _id: "id",
          message: "This syntax is not allowed: VElement[name=p]"
        }
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "Identifier" }],
    code: `
      <script lang="ts">
      const id1 = [];
      </script>
    `,
    errors: [
      {
        line: 2,
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
      { ignoreSelector: "Identifier[name=id2]", selector: "Identifier" }
    ],
    code: `
      <template>
        <div
          @click="
            id1 = [];
            id2 = [];
          "
        ></div>
      </template>
    `,
    errors: [
      {
        line: 4,
        messageId: MessageId.customMessage,
        data: { _id: "id", message: "This syntax is not allowed: Identifier" }
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
