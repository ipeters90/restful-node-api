var app        = require('express')(),
	bodyParser = require('body-parser'),
	morgan     = require('morgan'),
	mongoose   = require('mongoose'),
	jwt        = require('jsonwebtokens'),
	config     = require('./config'),
	User       = require('./models/user'),
	routes     = require('./routes/index'),
	port       = process.env.PORT || 9000,

mongoose.connect(config.database_uri); // connecting to the database

app.set('topSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Register all our routes with /api
app.use('/api', routes);

// logging out requests to the console
app.use(morgan('dev'));

app.listen(port, function() {
	console.log('Listening on http://localhost/%d', port);
})