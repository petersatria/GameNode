const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const User = require('../models/user');
const passport = require('passport');
const verify = require('../middleware')
const jwt = require('jsonwebtoken')

router.route('/register')
	.get(userController.registerView)
	.post(userController.registerPost);

router.route('/login')
	.get(userController.loginView)
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.loginPost);
// .post(userController.loginPost)
router.post('/logout', userController.logoutPost)

router.get('/dashboard', verify.verifyToken, async (req, res) => {
	// const token = req.header('auth-token');
	const token = req.cookies.token;

	let users = await User.find({});
	let user = await User.findOne({ _id: req.user._id });

	jwt.verify(token, process.env.TOKEN_SECRET, (err, result) => {
		if (result) {
			if (result.type_user === '0') {
				console.log(users)
				// res.send({
				// 	message: 'Successfull to get admin data!',
				// 	data: users
				// })
				res.render('users/dashboard', { users })
			} else {
				console.log(user)
				// res.send({
				// 	message: 'Successfull to get user data!',
				// 	data: user
				// })
				res.render('users/dashboard', { user })
			}

		}
	})

	// const users = await User.find({});
	// res.render('users/dashboard', { users })
	// res.status(200).send({
	// 	body: users
	// })
})

router.delete('/dashboard/:id', async (req, res) => {
	const { id } = req.params;
	const deleted = await User.findByIdAndDelete(id);
	res.redirect('/dashboard');
})

router.get('/dashboard/new', async (req, res) => {
	res.render('profiles/new');
})

router.route('/dashboard/new')

	.post(userController.addUser);

module.exports = router;