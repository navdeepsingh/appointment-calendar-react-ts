const withSass = require("@zeit/next-sass");

module.exports = withSass({
  cssModules: true,
  env: {
    API_URL: process.env.API_URL,
  },
});
