```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "@skylib/{{name}}": [
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
