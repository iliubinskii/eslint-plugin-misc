import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["sort-array"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-array", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ selector: "Identifier", triggerByComment: false }],
    code: "const id = 1;",
    errors: [{ line: 1, messageId: MessageId.expectingArray }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ triggerByComment: false }],
    code: `
      const x = [
        {},
        "a",
        "c",
        // Comment
        "b"
      ];
    `,
    output: `
      const x = [
        {},
        "a",
        // Comment
        "b",
        "c"
      ];
    `,
    errors: [
      { line: 4, endLine: 6, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ triggerByComment: false }],
    code: `
      const x = [
        "d",
        "c",
        ...[],
        "b",
        "a"
      ];
    `,
    output: `
      const x = [
        "c",
        "d",
        ...[],
        "a",
        "b"
      ];
    `,
    errors: [
      { line: 2, endLine: 3, messageId: MessageId.incorrectSortingOrder },
      { line: 5, endLine: 6, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        selector: "ArrayExpression",
        sendToBottom: /^bottom:/u.source,
        sendToTop: /^top:/u.source,
        sortKey: "key",
        triggerByComment: false
      }
    ],
    code: `
      const x = [
        { ...{}, a: 1, key: "top:x" },
        { ...{}, a: 2, key: "bottom:y" },
        { ...{}, a: 3, key: "bottom:x" },
        { ...{}, a: 4, key: "a" },
        { ...{}, a: 5, key: "c" },
        { ...{}, a: 6, key: "b" },
        { ...{}, a: 7, key: "top:y" }
      ];
    `,
    output: `
      const x = [
        { ...{}, a: 1, key: "top:x" },
        { ...{}, a: 7, key: "top:y" },
        { ...{}, a: 4, key: "a" },
        { ...{}, a: 6, key: "b" },
        { ...{}, a: 5, key: "c" },
        { ...{}, a: 3, key: "bottom:x" },
        { ...{}, a: 2, key: "bottom:y" }
      ];
    `,
    errors: [
      { line: 3, endLine: 8, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x =
        // @sorted
        ["b", "a"];
      const y = ["b", "a"];
    `,
    output: `
      const x =
        // @sorted
        ["a", "b"];
      const y = ["b", "a"];
    `,
    errors: [{ line: 3, messageId: MessageId.incorrectSortingOrder }]
  }
]);
