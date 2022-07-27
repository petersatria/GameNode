const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const User = require('../models/user');
const passport = require('passport');

router.route('/register')
	.get(userController.registerView)
	.post(userController.registerPost);

router.route('/login')
	.get(userController.loginView)
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userController.loginPost);

router.post('/logout', userController.logoutPost)

router.get('/dashboard', async (req, res) => {
	const users = await User.find({});
	res.render('users/dashboard', { users })
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