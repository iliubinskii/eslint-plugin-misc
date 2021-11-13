[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / sort-top-comments

# sort-top-comments

Sorts top comments.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/sort-top-comments": "error"
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