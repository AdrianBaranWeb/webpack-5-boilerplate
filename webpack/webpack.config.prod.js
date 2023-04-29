const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const path = require('path');
const {prodLoaders} = require('./loaders');
const {commonPlugins} = require('./plugins');

module.exports = {
	mode: 'production',
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle-[contenthash:8].js',
		clean: true, // This line doesn't work correctly right now, that is why use CleanWebpackPlugin.
		assetModuleFilename: 'assets/[name]-[contenthash:8][ext]',
	},
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
	optimization: {
		minimizer: ['...', new CssMinimizerPlugin({parallel: 4})],
	},
	module: {
		rules: prodLoaders,
	},
	plugins: commonPlugins,
};
