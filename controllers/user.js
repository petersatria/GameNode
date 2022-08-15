const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Profile = require('../models/user_profile');
const History = require('../models/game_history');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

exports.registerView = (req, res) => {
	res.render('users/register')
}

exports.registerPost = catchAsync(async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		const registeredUser = await User.register(user, password);

		let profile = await Profile.create({
			user_id: user._id, first_name: '', last_name: '',
			address: '', phone: 0, birthdate: '', gender: ''
		});
		let history = await History.create({
			user_id: user._id, win: 0, draw: 0,
			lose: 0, date_time: 0
		});
		// const { first_name, last_name, address } = '';
		// const profile = new Profile({ first_name, last_name, address });
		user.user_profile.push(profile);
		profile.user = user;

		user.game_history.push(history);
		history.user = user;

		await user.save();
		await profile.save();
		await history.save();
		req.login(registeredUser, err => {
			if (err) return next(err);
			req.flash('success', 'Welcome to My Game!');
			res.redirect('/');
		})
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/register');
	}
})

exports.loginView = (req, res) => {
	res.render('users/login')
}

exports.loginPost = async (req, res) => {
	req.flash('success', 'Welcome to My Game!');
	// res.redirect('/');
	const user = await User.findOne({ username: req.body.username })
	// if (!user) return res.status(400).send('Email not found');

	const token = jwt.sign({
		_id: user._id, type_user: user.type_user
	}, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 60 })

	res.cookie('token', token, {
		httpOnly: true
	})
	// res.header('auth-token', token)
	// .send(token);
	res.redirect('/')

	// res.redirect('/');
}

exports.logoutPost = (req, res) => {
	req.logout(err => {
		if (err) return next(err);
		req.flash('success', 'Goodbye!');
		res.redirect('/');
	});
}

exports.addUser = catchAsync(async (req, res, next) => {
	try {
		const { email, username, password } = req.body;
		const user = new User({ email, username });
		await User.register(user, password);
		let profile = await Profile.create({
			user_id: user._id, first_name: '', last_name: '',
			address: '', phone: 0, birthdate: '', gender: ''
		});
		let history = await History.create({
			user_id: user._id, win: 0, draw: 0,
			lose: 0, date_time: 0
		});
		user.user_profile.push(profile);
		profile.user = user;

		user.game_history.push(history);
		history.user = user;

		await user.save();
		await profile.save();
		await history.save();

		req.flash('success', 'Add User!');
		res.redirect('/dashboard');
	} catch (e) {
		req.flash('error', e.message);
		res.redirect('/register');
	}
})