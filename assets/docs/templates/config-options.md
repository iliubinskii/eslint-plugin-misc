```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "@skylib/{{name}}": [
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
