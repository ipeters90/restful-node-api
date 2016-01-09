var User   = require('../models/user');
var jwt    = require('jsonwebtoken');
var secret = require('../../config').secret;

// logging in to the application
exports.login = function(req, res, next) {
 
  var email = req.body.email || '';
  var password = req.body.password || '';
 
  if (email == '' || password == '') {
    return res.send(401);
  }

  User.findOne({
    email: email
  }, function(err, user) {
      if (err) return next(err);

		  if (!user) {
		    res.json({ success: false, message: 'Authentication failed. User not found.' });
		  }
		  else if (user) {
		    user.verifyPassword(password, function(err, isMatch) {
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
	        user: user._id
	      });
			})
		  }
    })
};