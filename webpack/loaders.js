const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonLoaders = [
  {test: /\.html$/, use: ['html-loader']},
  {
    test: /\.css$/,
    // You can also use this config:
    // use: ['style-loader', 'css-loader'],
    use: [MiniCssExtractPlugin.loader, 'css-loader'],
  },
  {
    test: /\.scss$/,
    // You can also use this config:
    // use: ['style-loader', 'css-loader', 'sass-loader'],
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
  },
];

module.exports = {
  commonLoaders
}