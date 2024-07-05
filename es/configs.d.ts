export declare const configs: {
    readonly all: {
        readonly overrides: readonly [{
            readonly files: readonly ["*.ts", "*.tsx"];
            readonly rules: {
                readonly "misc/typescript/no-restricted-syntax": "off";
            };
        }];
        readonly rules: {
            readonly "misc/match-filename": "off";
            readonly "misc/no-restricted-syntax": "off";
            readonly "misc/require-syntax": "off";
            readonly "misc/wrap": "off";
        };
    };
    readonly core: {
        readonly rules: {
            readonly "misc/match-filename": "off";
            readonly "misc/no-restricted-syntax": "off";
            readonly "misc/require-syntax": "off";
            readonly "misc/wrap": "off";
        };
    };
    readonly typescript: {
        readonly rules: {
            readonly "misc/typescript/no-restricted-syntax": "off";
        };
    };
};
//# sourceMappingURL=configs.d.ts.map