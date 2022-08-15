exports.isLoggedIn = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You must be signed in first!');
		return res.redirect('/login');
	}
	next();
}

const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
	// const token = req.header('auth-token');
	const token = req.cookies.token;

	if (!token) return res.status(401).send('Access denied')

	try {
		const verified = jwt.verify(token, process.env.TOKEN_SECRET);
		req.user = verified;
		next();
	} catch (error) {
		res.status(400).send('Invalid Token')
	}
}
