// Create our Express router
var router = require('express').Router();

// User controller/business logic
var userController = require('../controllers/user');

// auth middleware for all secured endpoints
var auth = require('../middlewares/validateRequest');

// Login authentication
var loginAuth = require('../controllers/authenticate');

router.get('/', function(req,res) {
	res.send("Welcome!");
});

router.route('/users')
	.post(loginAuth.login);


// Used for admins
router.route('/users')
	.get(auth.validateUser, userController.getAll)

router.route('/users/:user_id')
	.get(auth.validateUser, userController.getOne)
	.post(auth.validateUser, userController.create)
	.put(auth.validateUser, userController.update)
	.delete(auth.validateUser, userController.delete);

module.exports = router;