var User = require('../models/user');

var users = {
 
  getAll: function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  },
 
  getOne: function(req, res) {
    User.findById(req.params.id, function(err, user) {
      if (err) throw err;
      res.json(user);
    })
  },
 
  create: function(req, res) {
    var user = new User({
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname
    });
    user.save(function(err) {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });
    })
  },
 
  update: function(req, res) {
    User.findById(req.body.user_id, function(err,user) {
      if (err)
        res.send(err);
      if (!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }
      user.email = req.body.email;
      firstname: req.body.firstname;
      lastname: req.body.lastname;

      user.save(function(err) {
        if (err) res.send(err);
        res.send({ success: true });
      })
    })
  },
 
  delete: function(req, res) {
    User.findById(req.body.user_id, function(err,user) {
      if (err) res.send(err);
      user.remove(function(err) {
        if (err) {
          res.statusCode = 500;
          res.send('Internal error(%d): %s',res.statusCode,err.message);
        }
      })
    })
  }
};
 
module.exports = users;