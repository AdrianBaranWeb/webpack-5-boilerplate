const path = require('path');

const {devLoaders} = require('./loaders');
const {commonPlugins} = require('./plugins');

module.exports = {
	mode: 'development',
	entry: './src/js/index.ts',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.js',
		clean: true, // This line doesn't work correctly right now, that is why use CleanWebpackPlugin.
		assetModuleFilename: 'assets/[name][ext]',
	},
	resolve: {
		extensions: ['.js', '.ts'],
	},
	devtool: 'eval-source-map',
	devServer: {
		static: {
			directory: path.join(__dirname, '../dist'),
		},
		compress: true,
		port: 9000,
		hot: true,
		devMiddleware: {
			writeToDisk: true, // This is optional
		},
	},
	module: {
		rules: devLoaders,
	},
	plugins: commonPlugins,
};
