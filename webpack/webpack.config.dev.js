const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
    clean: true,
	},
	module: {
		rules: [
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
		],
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({template: './src/index.html'}),
	],
};
