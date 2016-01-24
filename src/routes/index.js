// Create our Express router
var router = require('express').Router();

// User controller/business logic
var userController = require('../controllers/user');

// Login authentication
var auth = require('../controllers/authenticate');

router.route('/')
	.get(function(req, res) { return res.send('Index page'); });

router.route('/login')
  .get(function(req, res) { return res.send('Login page'); })
  .post(auth.login);

router.route('/register')
	.get(function(req, res) { return res.send('Register page'); })
	.post(userController.create);

router.route('/api/users')
  .get(userController.getAll);

router.route('/api/users/:user_id')
  .get(userController.getOne)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;