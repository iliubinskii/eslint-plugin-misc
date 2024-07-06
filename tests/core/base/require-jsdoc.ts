/* eslint-disable misc/no-at-sign-internal-import -- Ok */

import { rules, utils } from "@";
import { InterfaceOption } from "@/core/base/require-jsdoc";
import getCurrentLine from "get-current-line";

const rule = rules["require-jsdoc"];

const MessageId = utils.getMessageId(rule);

utils.testRule("require-jsdoc", rule, [
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      function f(): void {}

      /** Comment */
      function g(): void {}
    `,
    errors: [{ line: 1, messageId: MessageId.undocumented }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ interfaces: [InterfaceOption.interface] }],
    code: `
      /** Comment */
      interface I {
        (): void;
        new (): void;
      }
      interface J extends I {
        (): void;
        new (): void;
      }
    `,
    errors: [{ line: 6, endLine: 9, messageId: MessageId.undocumented }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ interfaces: [InterfaceOption.callSignatures] }],
    code: `
      interface I {
        /** Comment */
        (): void;
        new (): void;
      }
      interface J extends I {
        (): void;
        new (): void;
      }
    `,
    errors: [
      { line: 6, endLine: 9, messageId: MessageId.undocumentedCallSignature }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ interfaces: [InterfaceOption.constructSignatures] }],
    code: `
      interface I {
        (): void;
        /** Comment */
        new (): object;
      }
      interface J extends I {
        (): void;
        new (): object;
      }
    `,
    errors: [
      {
        line: 6,
        endLine: 9,
        messageId: MessageId.undocumentedConstructSignature
      }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [{ includeSelectors: ["ClassDeclaration"] }],
    code: `
      class C {
        public constructor()  {}
        public get x(): boolean { return true; }
        public set x(value: boolean) {}
        public f() {}
        public static g() {}
      }

      class D extends C {
        public constructor()  {}
        public get x(): boolean { return true; }
        public set x(value: boolean) {}
        public f() {}
        public static g() {}
      }

      /** Comment */
      class E extends D {
        /** Comment */
        public constructor()  {}
        /** Comment */
        public get x(): boolean { return true; }
        /** Comment */
        public set x(value: boolean) {}
        /** Comment */
        public f() {}
        /** Comment */
        public static g() {}
      }

      /** Comment */
      class F extends E {
        /** Comment */
        public constructor()  {}
        public get x(): boolean { return true; }
        public set x(value: boolean) {}
        public f() {}
        /** Comment */
        public static g() {}
      }
    `,
    errors: [
      { line: 1, endLine: 7, messageId: MessageId.undocumented },
      { line: 2, messageId: MessageId.undocumentedConstructSignature },
      { line: 3, messageId: MessageId.undocumented },
      { line: 4, messageId: MessageId.undocumented },
      { line: 5, messageId: MessageId.undocumented },
      { line: 6, messageId: MessageId.undocumented },
      { line: 9, endLine: 15, messageId: MessageId.undocumented },
      { line: 10, messageId: MessageId.undocumentedConstructSignature },
      { line: 11, messageId: MessageId.undocumented },
      { line: 12, messageId: MessageId.undocumented },
      { line: 13, messageId: MessageId.undocumented },
      { line: 14, messageId: MessageId.undocumented }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    options: [
      {
        includeSelectors: ["ClassDeclaration"],
        noDefaultSelectors: true
      }
    ],
    code: `
      class C {
        public constructor()  {}
        public get x(): boolean { return true; }
        public set x(value: boolean) {}
        public f() {}
        public static g() {}
      }
    `,
    errors: [{ line: 1, endLine: 7, messageId: MessageId.undocumented }]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      let f1: () => void;
      let f2: {
        g: () => void
      };
      /** Comment */
      let f3: () => void;
      let f4: {
        /** Comment */
        g: () => void
      };
    `,
    errors: [
      { line: 1, messageId: MessageId.undocumented },
      { line: 3, messageId: MessageId.undocumented }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      const x = {
        f: () => {},
        g: function () {}
      };

      const y: I = {
        f: () => {},
        g: function () {}
      };
    `,
    errors: [
      { line: 2, messageId: MessageId.undocumented },
      { line: 3, messageId: MessageId.undocumented }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        f = () => {};
        g = function () {};
      }

      class D {
        f: I = () => {};
        g: I = function () {};
      }
    `,
    errors: [
      { line: 2, messageId: MessageId.undocumented },
      { line: 3, messageId: MessageId.undocumented }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      class C {
        f: () => void;
        g: {
          h: () => void
        };
      }
    `,
    errors: [
      { line: 2, messageId: MessageId.undocumented },
      { line: 4, messageId: MessageId.undocumented }
    ]
  },
  {
    name: `Test at line ${getCurrentLine().line}`,
    code: `
      interface I {
        f: () => void;
        readonly g: () => void;
      }

      interface J {
        /** Comment */
        f: () => void;
        /** Comment */
        readonly g: () => void;
      }
    `,
    errors: [
      { line: 2, messageId: MessageId.undocumented },
      { line: 3, messageId: MessageId.undocumented }
    ]
  }
]);
