// eslint-disable-next-line @skylib/no-at-sign-internal-import, @skylib/no-internal-modules -- Ok
import { InterfaceOption, PropertyOption } from "@/misc/core/require-jsdoc";
import { rules, utils } from "@";
import getCurrentLine from "get-current-line";

const rule = rules["require-jsdoc"];

const MessageId = utils.getMessageId(rule);

utils.testRule(
  "require-jsdoc",
  rule,
  [
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
      code: `
        class C {
          public constructor()  {}
          public get x(): boolean { return true; }
          public set x(value: boolean) {}
          public f() {}
          public static g() {}
        }

        /** Comment */
        class D {
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
      `,
      errors: [
        { line: 1, endLine: 7, messageId: MessageId.undocumented },
        { line: 2, messageId: MessageId.undocumentedConstructSignature },
        { line: 3, messageId: MessageId.undocumented },
        { line: 4, messageId: MessageId.undocumented },
        { line: 5, messageId: MessageId.undocumented },
        { line: 6, messageId: MessageId.undocumented }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ properties: [PropertyOption.function] }],
      code: `
        class C {
          f1: () => void;
          /** Comment */
          f2: () => void;
          f3;
          f4: string;
        }
      `,
      errors: [
        { line: 1, endLine: 7, messageId: MessageId.undocumented },
        { line: 2, messageId: MessageId.undocumented }
      ]
    },
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ properties: [PropertyOption.nonFunction] }],
      code: `
        class C {
          x1: string;
          /** Comment */
          x2: string;
          x3;
          x4: () => void;
        }
      `,
      errors: [
        { line: 1, endLine: 7, messageId: MessageId.undocumented },
        { line: 2, messageId: MessageId.undocumented }
      ]
    }
  ],
  [
    {
      name: `Test at line ${getCurrentLine().line}`,
      options: [{ includeSelectors: ["Literal"], noDefaultSelectors: true }],
      code: "class C {}"
    }
  ]
);
