const path = require('path');

module.exports = {
	
  entry: {
    app: ["./src/main.js"]
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: 'bundle.js'
  },

  resolve: {
    modules: [ __dirname, 'node_modules', './', './src']
  }

};
