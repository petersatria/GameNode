const express = require('express')
const router = express.Router()
const session = require('express-session');

router.use(session({ secret: 'secretKey' }))

const requireLogin = (req, res, next) => {
	if (!req.session.user_id) {
		return res.redirect('/login')
	}
	next();
}

router.get('/', function (req, res) {
	res.render('index')
});

router.get('/login', function (req, res) {
	res.render('login')
});

router.post('/login', async (req, res) => {
	let reqData = req.body
	let dataUser = {
		username: "petersatria",
		password: "123"
	}

	if (reqData.username !== dataUser.username && reqData.password !== dataUser.password) {
		res.redirect('/login')
		// res.send({
		// 		message: 'failed login, wrong username and password'
		// })


	} else if (reqData.username === dataUser.username) {
		if (reqData.password === dataUser.password) {
			req.session.user_id = dataUser.username;
			// res.status(200).send({
			// 	message: 'succes login',
			// 	resultData: dataUser,
			// 	statusCode: 200
			// })
			res.redirect('/');
		} else {
			res.redirect('/login');
			// res.send({
			// 		message: 'failed login, wrong password'
			// })
		}
	} else {
		res.redirect('/login')
		// res.send({
		// 		message: 'failed login, wrong username'
		// })
	}
})

router.post('/logout', (req, res) => {
	req.session.user_id = null;
	// req.session.destroy();
	res.redirect('/');
})

router.get('/game', requireLogin, (req, res) => {
	res.render('game')
})

module.exports = router