const path = require('path');

module.exports = {
	
  entry: {
    examples: './examples/ExamplePicker.js',
    main: './src/main.js'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/assets/',
    filename: '[name].js'
  },

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]
  }

};
