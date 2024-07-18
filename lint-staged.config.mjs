/**
 * @type {import('lint-staged').Config}
 */
const config = {
  "!({dist,docs,es})/**/*.{cjs,js,mjs,jsx,ts,tsx}": "eslint --max-warnings=0",
  "!({dist,docs,es})/**/*.{css,html,json,less,postcss,scss}":
    "prettier --write",
  "!({dist,docs,es})/**/*.md": "markdownlint"
};

export default config;
