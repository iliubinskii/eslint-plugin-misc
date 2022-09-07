```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/{{name}}": [
      "error",
      {
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
{{suboptions-annotation}}
