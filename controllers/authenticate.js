var User   = require('../models/user');
var jwt    = require('jsonwebtokens');
var secret = require('../config').secret;

// logging in to the application
exports.login = function(req, res, next) {
	User.findOne({
		email: req.body.email
	}, function(err, user) {
		if (err) return next(err);

		if (!user) {
			res.json({ success: false, message: 'Authentication failed. User not found.' });
		}
		else if (user) {
			user.verifyPassword(req.body.password, function(err, isMatch) {
				if (err) return next(err);

				if (!isMatch) {
					return next(null, false);
				}
		        var token = jwt.sign(user, secret, {
		          expiresInMinutes: 1440 // expires in 24 hours
		        });
		        res.json({
		          success: true,
		          token: token,
		          user: user.email
		        });
			})
		}
	})
}

exports.validateUser = function(req, res, next) {

	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];

	if (token) {
	    jwt.verify(token, secret, function(err, decoded) {      
	      if (err) {
	        return res.json({ success: false, message: 'Failed to authenticate token.' });    
	      } else {
	        // if everything is good, save to request for use in other routes
	        req.decoded = decoded;    
	        next();
	      }
	    });
	}
	else {
	    // if there is no token
	    // return an error
	    return res.status(403).send({ 
	        success: false, 
	        message: 'No token provided.' 
	    });
	}

}