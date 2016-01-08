var path = require('path');
var webpack = require('webpack');

module.exports = {
	output: {

	},
	module: {
		loaders: [{
			test: /\.js$/,
			loaders:['babel-loader'],
			exclude: /node_modules/
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		})
	]
}