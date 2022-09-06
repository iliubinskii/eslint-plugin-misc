import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["comment-spacing"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "comment-spacing",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <script lang="ts">
        // Comment

        /** Comment */

        function f() {}
        </script>
      `,
      output: `
        <script lang="ts">
        // Comment
        /** Comment */
        function f() {}
        </script>
      `,
      errors: [
        { line: 2, messageId: MessageId.removeEmptyLine },
        { line: 4, messageId: MessageId.removeEmptyLine }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        // Comment

        function f() {}

        /** Comment */

        function g() {}

        /*
        Comment
        */
        function h() {}
      `,
      output: `
        // Comment
        function f() {}

        /** Comment */
        function g() {}

        /*
        Comment
        */

        function h() {}
      `,
      errors: [
        { line: 1, messageId: MessageId.removeEmptyLine },
        { line: 5, messageId: MessageId.removeEmptyLine },
        { line: 9, endLine: 11, messageId: MessageId.addEmptyLine }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        /* eslint-disable: rule1 */

        /* eslint-disable: rule2 */

        /* eslint-disable: rule3 */
        function f() {}
      `,
      output: `
        /* eslint-disable: rule1 */
        /* eslint-disable: rule2 */
        /* eslint-disable: rule3 */

        function f() {}
      `,
      errors: [
        { line: 1, messageId: MessageId.removeEmptyLine },
        { line: 3, messageId: MessageId.removeEmptyLine },
        { line: 5, messageId: MessageId.addEmptyLine }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        interface I {
          /**
           * Comment.
           */
          (): void;
        }
      `
    }
  ]
);
