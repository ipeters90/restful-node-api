var path = require('path');
var webpack = require('webpack');

module.exports = {
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '/assets/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders:['babel-loader'],
			exclude: /node_modules/,
			query: { presets: ['es2015']}
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
};