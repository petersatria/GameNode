// const express = require('express')
// const router = express.Router()
// const session = require('express-session');

// router.use(session({ secret: 'secretKey' }))

// const requireLogin = (req, res, next) => {
// 	if (!req.session.user_id) {
// 		return res.redirect('/')
// 	}
// 	next();
// }

// router.get('/', function (req, res) {
// 	res.render('index')
// });

// router.get('/login', function (req, res) {
// 	res.render('login')
// });

// router.post('/login', function (req, res) {
// 	let reqData = req.body
// 	let dataUser = {
// 		username: "petersatria",
// 		password: "123"
// 	}

// 	if (reqData.username !== dataUser.username && reqData.password !== dataUser.password) {
// 		res.send({
// 			message: 'failed login, wrong username and password'
// 		})
// 	} else if (reqData.username === dataUser.username) {
// 		if (reqData.password === dataUser.password) {
// 			res.status(200).send({
// 				message: 'succes login',
// 				resultData: dataUser,
// 				statusCode: 200
// 			})
// 		} else {
// 			res.send({
// 				message: 'failed login, wrong password'
// 			})
// 		}
// 	} else {
// 		res.send({
// 			message: 'failed login, wrong username'
// 		})
// 	}
// });

// router.get('/game', requireLogin, function (req, res) {
// 	res.render('game')
// });

// module.exports = router