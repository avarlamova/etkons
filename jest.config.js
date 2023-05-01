module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/typescript",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    axios: "axios/dist/node/axios.cjs",
  },
};
