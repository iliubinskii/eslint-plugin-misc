/**
 * @type {import('lint-staged').Config}
 */
const config = {
  "*.{css,html,json,less,postcss,scss}": "prettier --write",
  "*.{js,jsx,ts,tsx}": [() => "npm run type-check", "eslint --max-warnings=0"],
  "*.md": "markdownlint"
};

export default config;
