var path = require('path');

module.exports = {
  entry: "./src/main.js",
  output: {
      filename: "DOMable.js",
      path: path.resolve(__dirname, 'dist')
  }
};
