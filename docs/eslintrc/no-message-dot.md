# eslintrc/no-message-dot

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / eslintrc/no-message-dot

Disallows dot at the end of message.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/eslintrc/no-message-dot": "error"
  }
};
```

## Examples of incorrect code

```ts
module.exports = {
  rules: {
    "misc/require-syntax": [
      "warn",
      {
        message: "Error message."
      }
    ]
  }
};
```

## Examples of correct code

```ts
module.exports = {
  rules: {
    "misc/require-syntax": [
      "warn",
      {
        message: "Error message"
      }
    ]
  }
};
```
