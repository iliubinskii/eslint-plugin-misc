import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["vue/sort-v-bind"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "sort-v-bind",
  rule,
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <template>
          <slot v-bind="obj" prop="prop" @click="click"></slot>
          <slot prop="prop" v-bind="obj" @click="click"></slot>
          <slot prop="prop" @click="click" v-bind="obj"></slot>
        </template>
      `,
      errors: [{ line: 2, messageId: MessageId.incorrectSortingOrder }]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <template>
          <slot prop="prop" @click="click"></slot>
        </template>
      `
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      code: `
        <template>
          <slot :prop1="prop1" prop2="prop2"></slot>
        </template>
      `
    }
  ]
);
