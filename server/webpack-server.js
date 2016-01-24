/*eslint no-console: 0*/

var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('../webpack.config');
var devPort = 3000;

new WebpackDevServer(webpack(config), {
	inline: true,
	historyApiFallback: true,
	stats: { colors: true }
})
.listen(devPort, 'localhost', function (err) {
	if (err) {
		console.log(err);
	}
	console.log('webpack-dev-server listening at localhost:%d', devPort);
});