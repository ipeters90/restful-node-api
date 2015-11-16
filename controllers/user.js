var User = require('../models/user');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var users = {
 
  getAll: function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  },
 
  getOne: function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) throw err;
      res.json(user);
    });
  },
 
  create: function(req, res) {
    var email = req.body.email || '';
    var password = req.body.password || '';

    if (email == '' || password == '') {
      return res.sendStatus(401);
    };

    User.findOne({ email: email }, function(err, user) {
      if (err) res.send(err);
      if (!user) {
        var newUser = new User({
          email: req.body.email,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname
        });
        newUser.save(function(err, user) {
          if (err) throw err;

          var token = jwt.sign(user, secret, {
            expiresInMinutes: 1440 // expires in 24 hours
          });

          res.json({
            success: true,
            token: token,
            user: user._id
          });
        });
      }
      else {
        return res.json({ success: false, msg: "User already exists."});
      }
    });
  },
 
  update: function(req, res) {
    User.findById(req.params.user_id, function(err,user) {
      if (err)
        res.send(err);
      if (!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      user.email = req.body.email;
      user.firstname = req.body.firstname;
      user.lastname = req.body.lastname;

      user.save(function(err) {
        if (err) res.send(err);
        res.send({ success: true });
      })
    })
  },
 
  delete: function(req, res) {
    User.remove({ _id: req.params.user_id }, function(err, user) {
      if (err) res.send(err);

      res.json({ success: true });
    });
  }
};
 
module.exports = users;