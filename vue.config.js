const { defineConfig } = require("@vue/cli-service");
const Dotenv = require('dotenv-webpack');
//https://stackoverflow.com/questions/55510326/vue-cli-3-environment-variables-all-undefined
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
});
