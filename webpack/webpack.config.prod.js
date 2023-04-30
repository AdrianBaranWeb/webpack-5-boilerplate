const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const path = require('path');
const {prodLoaders} = require('./loaders');
const {prodPlugins} = require('./plugins');

const imageMinimizerPlugins = [
	['imagemin-mozjpeg', {quality: 70}],
	[
		'imagemin-pngquant',
		{
			quality: [0.65, 0.9],
			speed: 4,
		},
	],
	['imagemin-gifsicle', {interlaced: true}],
	[
		'imagemin-svgo',
		{
			plugins: [
				{
					name: 'preset-default',
					params: {
						overrides: {
							removeViewBox: false,
							addAttributesToSVGElement: {
								params: {
									attributes: [{xmlns: 'http://www.w3.org/2000/svg'}],
								},
							},
						},
					},
				},
			],
		},
	],
	['imagemin-webp', {quality: 75}],
];

module.exports = {
	mode: 'production',
	entry: './src/js/index.ts',
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
	},
	optimization: {
		minimizer: [
			'...',
			new CssMinimizerPlugin({
				parallel: 4,
				minimizerOptions: {
					preset: ['default', {discordComments: {removeAll: true}}],
				},
			}),
			new ImageMinimizerPlugin({
				loader: true,
				minimizer: {
					implementation: ImageMinimizerPlugin.imageminMinify,
					options: {
						plugins: imageMinimizerPlugins,
					},
				},
				// Use generator if images come from API
				// generator: [
				// 	{
				// 		implementation: ImageMinimizerPlugin.imageminGenerate,
				// 		type: 'asset',
				// 		options: {
				// 			preset: 'webp-custom-name',
				// 			plugins: imageMinimizerPlugins
				// 		},
				// 	},
				// ],
			}),
		],
		splitChunks: {
			chunks: 'all',
			maxSize: Infinity,
			minSize: 0,
			cacheGroups: {
				nodeModules: {
					test: /[\\/]node_modules[\\/]/i,
					chunks: 'initial',
					name(module){
						const name = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						return name;
					},
				},
			},
		},
	},
	module: {
		rules: prodLoaders,
	},
	plugins: prodPlugins,
};
