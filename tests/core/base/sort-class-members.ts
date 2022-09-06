import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["sort-class-members"];

const MessageId = utils.getMessageId(rule);

utils.testRule("sort-class-members", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        f1() {}
        f3() {}
        f2() {}
        f4() {}
      }
    `,
    output: `
      class C {
        f1() {}
        f2() {}
        f3() {}
        f4() {}
      }
    `,
    errors: [
      { line: 3, endLine: 4, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["public", "protected", "private"] }],
    code: `
      class C {
        private f() {}
        protected g() {}
        public h() {}
      }
    `,
    output: `
      class C {
        public h() {}
        protected g() {}
        private f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 4, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        sortingOrder: [
          "signature",
          "field",
          "get",
          "set",
          "constructor",
          "method"
        ]
      }
    ],
    code: `
      abstract class C {
        f() {}
        constructor () {}
        set x(value: number) {}
        get x(): number { return this.value; }
        abstract value2 = 1;
        value1 = 1;
        [key: string]: unknown;
      }
    `,
    output: `
      abstract class C {
        [key: string]: unknown;
        value1 = 1;
        abstract value2 = 1;
        get x(): number { return this.value; }
        set x(value: number) {}
        constructor () {}
        f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 8, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        sortingOrder: [
          "signature",
          "field",
          "accessor",
          "constructor",
          "method"
        ]
      }
    ],
    code: `
      class C {
        f() {}
        constructor () {}
        get z(): number { return this.value; }
        set y(value: number) {}
        get y(): number { return this.value; }
        set x(value: number) {}
        value = 1;
        [key: string]: unknown;
      }
    `,
    output: `
      class C {
        [key: string]: unknown;
        value = 1;
        set x(value: number) {}
        get y(): number { return this.value; }
        set y(value: number) {}
        get z(): number { return this.value; }
        constructor () {}
        f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 9, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["public-method", "field-private"] }],
    code: `
      class C {
        /** Comment 2 */
        private value = 1;
        /** Comment 1 */
        public f() {}
      }
    `,
    output: `
      class C {
        /** Comment 1 */
        public f() {}
        /** Comment 2 */
        private value = 1;
      }
    `,
    errors: [
      { line: 3, endLine: 5, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        sortingOrder: [
          "signature",
          "public-field",
          "public-accessor",
          "public-constructor",
          "public-method",
          "protected-field",
          "protected-accessor",
          "protected-constructor",
          "protected-method",
          "private-field",
          "private-accessor",
          "private-constructor",
          "private-method"
        ]
      }
    ],
    code: `
      class C {
        f() {}
        constructor() {}
      }
    `,
    output: `
      class C {
        constructor() {}
        f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 3, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["static", "dynamic"] }],
    code: `
      class C {
        f() {}
        static g() {}
      }
    `,
    output: `
      class C {
        static g() {}
        f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 3, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ sortingOrder: ["block", "method"] }],
    code: `
      class C {
        f() {}
        static {}
      }
    `,
    output: `
      class C {
        static {}
        f() {}
      }
    `,
    errors: [
      { line: 2, endLine: 3, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        "g"() {}
        "f"() {}
        *[Symbol.iterator](): Iterator<number> {}
      }
    `,
    output: `
      class C {
        *[Symbol.iterator](): Iterator<number> {}
        "f"() {}
        "g"() {}
      }
    `,
    errors: [
      { line: 2, endLine: 4, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        sortingOrder: [
          "signature",
          "field",
          "accessor",
          "constructor",
          "method"
        ]
      }
    ],
    code: `
      class C {
        h() {}
        g = () => {};
        f() {}
      }
    `,
    output: `
      class C {
        f() {}
        g = () => {};
        h() {}
      }
    `,
    errors: [
      { line: 2, endLine: 4, messageId: MessageId.incorrectSortingOrder }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        sortingOrder: [
          "public-static-field",
          "public-static-accessor",
          "public-static-constructor",
          "public-static-method",
          "signature",
          "public-dynamic-field",
          "public-dynamic-accessor",
          "public-dynamic-constructor",
          "public-dynamic-method",
          "protected-static-field",
          "protected-static-accessor",
          "protected-static-constructor",
          "protected-static-method",
          "protected-dynamic-field",
          "protected-dynamic-accessor",
          "protected-dynamic-constructor",
          "protected-dynamic-method",
          "private-static-field",
          "private-static-accessor",
          "private-static-constructor",
          "private-static-method",
          "private-dynamic-field",
          "private-dynamic-accessor",
          "private-dynamic-constructor",
          "private-dynamic-method"
        ]
      }
    ],
    code: `
      export class C {
        protected readonly a = 1;
        public b(): void {}
      }
    `,
    output: `
      export class C {
        public b(): void {}
        protected readonly a = 1;
      }
    `,
    errors: [
      { line: 2, endLine: 3, messageId: MessageId.incorrectSortingOrder }
    ]
  }
]);
