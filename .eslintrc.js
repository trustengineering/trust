module.exports = {
  extends: ["airbnb-base", "prettier"],
  env: {
    node: true,
    mocha: true,
    amd: true
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
    devDependencies: false
  },
  globals: {
    expect: true
  }
};
