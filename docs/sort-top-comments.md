# sort-top-comments

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / sort-top-comments

Sorts top comments.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/sort-top-comments": "error"
  }
};
```

## Examples of incorrect code

```ts
// Comment 4
// Comment 3
/* Comment 2 */
/* Comment 1 */
```

## Examples of correct code

```ts
/* Comment 1 */
/* Comment 2 */
// Comment 3
// Comment 4
```
