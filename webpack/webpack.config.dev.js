const path = require('path');

const {commonLoaders} = require('./loaders')
const {commonPlugins} = require('./plugins')

module.exports = {
	mode: 'development',
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].bundle.js',
		clean: true, // This line doesn't work correctly right now, that is why use CleanWebpackPlugin.
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
		rules: commonLoaders,
	},
	plugins: commonPlugins,
};
