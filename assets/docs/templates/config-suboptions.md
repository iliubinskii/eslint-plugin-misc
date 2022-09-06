```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "@skylib/{{name}}": [
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
