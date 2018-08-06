import path from 'path';

export default {
  mode: 'development',
  target: 'electron-renderer',
  entry: {
    main: './src/main.js',
    sub: './src/sub.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'build')
  },
  node: {
    __dirname: false,
    __filename: false,
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
