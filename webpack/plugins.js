const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

// This array should contain names of all html files
const htmlPages = ['index'];
const multipleHtmlPlugins = htmlPages.map((name) => {
	return new HtmlWebpackPlugin({
		template: `./src/${name}.html`, // relative path to the HTML files
		filename: `${name}.html`, // output HTML files
	});
});

const commonPlugins = [
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin(),
	...multipleHtmlPlugins,
];

module.exports = {
	commonPlugins,
};
