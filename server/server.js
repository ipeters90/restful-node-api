var app        = require('express')(),
	bodyParser   = require('body-parser'),
	cookieParser = require('cookie-parser'),
	logger       = require('morgan'),
	mongoose     = require('mongoose'),
	cors         = require('cors'),
	config       = require('../config'),
	routes       = require('../src/routes/index'),
	port         = process.env.PORT || 9000;

mongoose.connect(config.database_uri); // connecting to the database

app.set('topSecret', config.secret); // secret variable

app.use(cors());

// logging out requests to the console
app.use(logger('dev'));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//parsing cookies
app.use(cookieParser());

app.all('/api/*', [require('../src/middlewares/validateRequest')]);
app.use('/', routes);

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/*eslint no-console: 0*/
app.listen(port, function() {
	console.log('Listening on http://localhost:%d', port);
});

module.exports = app;