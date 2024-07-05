```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/%NAME%": [
      "error",
      {
        %OPTIONS%,
        %KEY%: [
          {
            %SUBOPTIONS%
          },
          ...
        ]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :---------- | :------ |

%OPTIONS-ANNOTATION%
%SUBOPTIONS-ANNOTATION%
