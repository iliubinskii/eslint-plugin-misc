```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/{{name}}": [
      "error",
      {
        {{options}}
      }
    ]
  }
};
```

| Option | Description | Default |
| :----- | :----- | :----- |
{{options-annotation}}
