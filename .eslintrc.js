module.exports = {
  extends: [
    "./node_modules/real-config/eslint",
    "./node_modules/real-config/eslint/packages/type-essentials",
    "./node_modules/real-config/eslint/packages/real-fns",
    "./node_modules/real-config/eslint/packages/real-classes",
    "./node_modules/real-config/eslint/special-locations",
    "./.eslintrc.overrides",
    "./.eslintrc.rule-overrides",
    "./.eslintrc.temp"
  ]
};
