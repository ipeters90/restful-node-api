// Create our Express router
var router = require('express').Router();

// User controller/business logic
var userController = require('./user');

// Login authentication
var authController = require('../controllers/authenticate');

router.get('/', function(req,res) {
	res.send("Hi")
})

router.route('/users')
	.post(authController.login);

// requiring token validation for every route except login
//router.use(authController.validateUser);

// Used for admins
router.route('/users')
	.get(userController.getAll)

router.route('/users/:user_id')
	.get(userController.getOne)
	.post(userController.create)
	.put(userController.update)
	.delete(userController.delete);

module.exports = router;