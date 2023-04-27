const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// This array should contain names of all html files
const htmlPages = ['index'];
const multipleHtmlPlugins = htmlPages.map((name) => {
	return new HtmlWebpackPlugin({
		template: `./src/${name}.html`, // relative path to the HTML files
		filename: `${name}.html`, // output HTML files
		chunks: [`${name}`], // respective JS files
	});
});

module.exports = {
	mode: 'development',
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
		// This line doesn't work correctly right now
		// that is why use CleanWebpackPlugin
		// If this will be fixed CleanWebpackPlugin can be removed
		clean: true,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, '../dist'),
		},
		compress: true,
		port: 9000,
		hot: true,
		devMiddleware: {
			writeToDisk: true,
		},
	},
	module: {
		rules: [
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
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(),
		...multipleHtmlPlugins,
	],
};
