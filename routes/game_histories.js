const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/dashboard/history/:id', async (req, res) => {
	const user = await User.findById(req.params.id).populate('game_history');
	res.render('profiles/history', { user })
})

module.exports = router;