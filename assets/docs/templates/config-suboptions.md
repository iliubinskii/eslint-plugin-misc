```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/%NAME%": [
      "error",
      {
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

%SUBOPTIONS-ANNOTATION%
