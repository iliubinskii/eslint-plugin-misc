/**
 * @type {import('lint-staged').Config}
 */
const config = {
  "./!({dist,docs,es})/**/*.{cjs,cjsx,js,jsx,mjs,mjsx,ts,tsx}":
    "eslint --max-warnings=0",
  "./!({dist,docs,es})/**/*.{css,html,json,less,postcss,scss}":
    "prettier --log-level warn --write",
  "./!({dist,docs,es})/**/*.md": "markdownlint",
  "./*.{cjs,cjsx,js,jsx,mjs,mjsx,ts,tsx}": "eslint --max-warnings=0",
  "./*.{css,html,json,less,postcss,scss}": "prettier --log-level warn --write",
  "./*.md": "markdownlint"
};

export default config;
