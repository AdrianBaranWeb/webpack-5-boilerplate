const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const commonLoaders = [
	{
		test: /\.(js|ts)$/,
		exclude: /node_modules/,
		use: [{loader: 'babel-loader', options: {}}],
	},
	{test: /\.html$/, loader: 'html-loader'},
	{
		test: /\.css$/,
		// You can also use this config:
		// use: ['style-loader', 'css-loader'],
		use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
	},
	{
		test: /\.scss$/,
		// You can also use this config:
		// use: ['style-loader', 'css-loader', 'sass-loader'],
		use: [
			MiniCssExtractPlugin.loader,
			'css-loader',
			'postcss-loader',
			'sass-loader',
		],
		sideEffects: true,
	},
	{
		test: /\.svg$/i,
		type: 'asset/inline',
	},
];

const devLoaders = [
	...commonLoaders,
	{
		test: /\.(png|jpg|jpeg|gif)$/i,
		exclude: /\.svg$/i,
		type: 'asset/resource',
	},
];

const prodLoaders = [...commonLoaders];

module.exports = {
	commonLoaders,
	prodLoaders,
	devLoaders,
};
