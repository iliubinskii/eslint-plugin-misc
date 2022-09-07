```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/{{name}}": [
      "error",
      {
        {{options}},
        {{key}}: [
          {
            {{suboptions}}
          },
          ...
        ]
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
{{options-annotation}}
{{suboptions-annotation}}
