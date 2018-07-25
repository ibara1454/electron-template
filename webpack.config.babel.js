import path from 'path';

export default {
  mode: 'development',
  entry: {
    main: './src/main.js',
    sub: './src/sub.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      }
    ]
  }
};
