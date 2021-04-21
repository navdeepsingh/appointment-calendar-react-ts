const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 9000;
const app = next({
  dev,
  dir: `${__dirname}/../../`,
});

module.exports = { app, port };
