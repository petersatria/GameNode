const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Profile = require('../models/user_profile');

router.get('/dashboard/:id', async (req, res) => {
	// try {
	// let user = await User.aggregate([
	// 	{
	// 		$lookup: {
	// 			from: 'users',
	// 			localField: 'user_id',
	// 			foreignField: '_id',
	// 			as: 'user_profile',
	// 		},
	// 	},
	// ])
	// 	res.render('users/profile', { user })
	// } catch (err) {
	// 	console.error(err);
	// }
	const user = await User.findById(req.params.id).populate('user_profile');

	user.user_profile.forEach(element => {
		console.log(element.first_name)
	});
	res.render('profiles/profile', { user })
})

router.get('/dashboard/:id/edit', async (req, res) => {
	const user = await User.findById(req.params.id).populate('user_profile');
	res.render('profiles/edit', { user })
})

// router.put('/dashboard/:id', async (req, res) => {
// 	const { id } = req.params;
// 	const user = await User.findById(id);
// 	const { first_name, last_name, address } = req.body;
// 	const profile = await Profile.findByIdAndUpdate(id, { first_name, last_name, address });
// 	// const profile = new Profile({ first_name, last_name, address });
// 	user.user_profile.push(profile);
// 	profile.user = user;
// 	// res.send(user)
// 	await user.save();
// 	await profile.save();
// 	res.redirect(`/dashboard/${id}`)
// })

//wrong get id 
router.put('/dashboard/:id', async (req, res) => {
	const { id } = req.params;
	const user = await User.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
	res.redirect(`/dashboard/${user._id}`);
})


module.exports = router;