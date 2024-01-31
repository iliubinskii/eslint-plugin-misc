module.exports = {
  extends: [
    "./node_modules/project-chore/eslint",
    "./node_modules/project-chore/eslint/packages/typescript-misc",
    "./node_modules/project-chore/eslint/special-locations",
    "./.eslintrc.overrides",
    "./.eslintrc.rule-overrides",
    "./.eslintrc.temp"
  ]
};
