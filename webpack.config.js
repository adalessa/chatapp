var path = require('path');

module.exports = {
  entry: './resources/js/funciones.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
      alias: {
          jquery: "jquery/src/jquery"
      }
  }
};
