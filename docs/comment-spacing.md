# comment-spacing

[ESLint plugin](https://iliubinskii.github.io/eslint-plugin-misc/) / comment-spacing

Requires consistent empty lines around comments.

```ts
module.exports = {
  plugins: ["misc"],
  rules: {
    "misc/comment-spacing": "error"
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