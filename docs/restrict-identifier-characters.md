# restrict-identifier-characters

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / restrict-identifier-characters

Requires that identifier consists only of english characters and dollar sign.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/restrict-identifier-characters": "error"
  }
};
```

## Examples of incorrect code

```ts
const абв = 1;
```

## Examples of correct code

```ts
const $x1 = 2;
```
