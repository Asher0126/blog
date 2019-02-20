module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "semi-spacing": ["error", { "before": false, "after": false }],
    // "semi": ["error", "always"],// 规则名称
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "space-before-function-paren": ["error", {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "ignore"
    }],
    // 'one-var': ["error", { var: "always", let: "always", const: "never" }]
    "one-var": ["off", { var: "always", let: "always", const: "always" }],
    "no-useless-escape": ["off"],
    "no-console": ["off"],
    "vue/require-default-prop": ["off"],
    "vue/no-v-html": ["off"],
    "vue/html-indent": ["error", 4]
  }
}
