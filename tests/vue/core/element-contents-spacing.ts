import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["vue/element-contents-spacing"];

const MessageId = utils.getMessageId(rule);

utils.testRule("element-contents-spacing", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <p> {{ contents }}</p>
        <p>{{ contents }} </p>
      </template>
    `,
    output: `
      <template>
        <p>{{ contents }}</p>
        <p>{{ contents }}</p>
      </template>
    `,
    errors: [
      { line: 2, messageId: MessageId.removeSpaces },
      { line: 3, messageId: MessageId.removeSpaces }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <p> <span>contents</span></p>
        <p><span>contents</span> </p>
      </template>
    `,
    output: `
      <template>
        <p><span>contents</span></p>
        <p><span>contents</span></p>
      </template>
    `,
    errors: [
      { line: 2, messageId: MessageId.removeSpaces },
      { line: 3, messageId: MessageId.removeSpaces }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <p> {{
          contents
        }}</p>
        <p>{{
          contents
        }} </p>
      </template>
    `,
    output: `
      <template>
        <p> {{
          contents
        }} </p>
        <p> {{
          contents
        }} </p>
      </template>
    `,
    errors: [
      { line: 2, endLine: 4, messageId: MessageId.addSpaces },
      { line: 5, endLine: 7, messageId: MessageId.addSpaces }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      <template>
        <p> <span>
          contents
          contents
        </span></p>
        <p><span>
          contents
          contents
        </span> </p>
      </template>
    `,
    output: `
      <template>
        <p> <span>
          contents
          contents
        </span> </p>
        <p> <span>
          contents
          contents
        </span> </p>
      </template>
    `,
    errors: [
      { line: 2, endLine: 5, messageId: MessageId.addSpaces },
      { line: 6, endLine: 9, messageId: MessageId.addSpaces }
    ]
  }
]);
