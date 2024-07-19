/**
 * @type {import("prettier").Options}
 */
const config = {
  arrowParens: "avoid",
  endOfLine: "lf",
  jsonRecursiveSort: true,
  plugins: ["prettier-plugin-packagejson", "prettier-plugin-sort-json"],
  quoteProps: "preserve",
  trailingComma: "none"
};

export default config;
