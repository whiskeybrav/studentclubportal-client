const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const config = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 3000,
		host: 'clubs.whiskeybravo.invalid'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.ts(x)?$/,
				use: [
					'ts-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.styl$/,
				use: [
					'style-loader',
					'css-loader',
					'stylus-loader'
				]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				rules: [{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								// options...
							}
						}
					]
				}]
			}
		]
	},
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.tsx',
			'.ts'
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Whiskey Bravo Student Clubs",
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
			}
		}),
		new CopyPlugin([
			{ from: 'static', to: 'static' },
		]),
		new MiniCssExtractPlugin({
			filename: 'css/mystyles.css'
		}),
		new webpack.DefinePlugin({
			'process.env.WBCLUBSBASEURL': JSON.stringify(process.env.WBCLUBSBASEURL || 'https://clubs-api.whiskeybravo.org/')
		}),
	],
	// optimization: {
	// 	runtimeChunk: 'single',
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			vendor: {
	// 				test: /[\\/]node_modules[\\/]/,
	// 				name: 'vendors',
	// 				chunks: 'all'
	// 			}
	// 		}
	// 	}
	// }
};

module.exports = config;