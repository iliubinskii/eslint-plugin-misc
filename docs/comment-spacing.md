[ESLint plugin](https://ilyub.github.io/eslint-plugin/) / comment-spacing

# comment-spacing

Requires consistent empty lines around comments.

```ts
module.exports = {
  plugins: ["@skylib/eslint-plugin"],
  rules: {
    "@skylib/comment-spacing": "error"
  }
};
```

## Examples of incorrect code

```ts
// Comment
function f() {}

/** Comment */
function g() {}

/*
Comment
*/

function h() {}
```

## Examples of correct code

```ts
// Comment

function f() {}

/** Comment */

function g() {}

/*
Comment
*/
function h() {}
```