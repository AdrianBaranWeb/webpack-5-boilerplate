const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {PurgeCSSPlugin} = require('purgecss-webpack-plugin');
// const CompressionPlugin = require('compression-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');
const path = require('path');

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

const prodPlugins = [
	...commonPlugins,
	new PurgeCSSPlugin({
		paths: glob.sync(`${path.join(__dirname, '../src')}/**/*`, {nodir: true}),
	}),
	// Use if images come frome API
	// new CopyPlugin(),
	// To use this files you need to configure server
	// new CompressionPlugin({
	// 	filename: '[path][base].br',
	// 	algorithm: 'brotliCompress',
	// 	test: /\.(js|ts|html|css)$/,
	// 	compressionOptions: {level: 11},
	// }),
];

module.exports = {
	commonPlugins,
	prodPlugins,
};
