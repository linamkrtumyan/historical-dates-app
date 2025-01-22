const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // Entry point for the app
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js',
    clean: true, // Cleans the output directory before each build
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Process .ts and .tsx files
        use: 'ts-loader',
        // use: ['ts-loader','style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Reads CSS files
      },
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'], // Reads SCSS files
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // Template for the HTML file
    }),
  ],
  devServer: {
    static: './dist', // Serve files from the dist folder
    port: 3000, // Port for the dev server
    open: true, // Automatically open the app in the browser
  },
  mode: 'development', // Set development mode
};
