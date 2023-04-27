const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonLoaders = [
	{test: /\.html$/, loader: 'html-loader'},
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
    sideEffects: true
	},
	{
		test: /\.svg$/i,
		type: 'asset/inline',
	},
	{
		test: /\.(png|jpg|jpeg|gif)$/i,
		type: 'asset/resource',
	},
];

module.exports = {
	commonLoaders,
};
