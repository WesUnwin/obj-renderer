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
    modules: [path.join(__dirname, 'src'), __dirname, 'node_modules'],
    modulesDirectories: [path.join(__dirname, 'src'), __dirname, 'node_modules']
  }

};
