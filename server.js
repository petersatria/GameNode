const express = require('express');
const app = express();
const path = require('path');
const port = 7000;
const ejsMate = require('ejs-mate');
const flash = require('connect-flash');
const methodOverride = require('method-override')

const User = require('./models/user');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExpressError = require('./utils/ExpressError');
const Dotenv = require('dotenv')

const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app);
const io = socketio(server)

io.on('connection', (socket) => {
	console.log('connected')
})

Dotenv.config();
app.engine('ejs', ejsMate)

const cookieParser = require('cookie-parser')
app.use(cookieParser())


app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
	secret: 'secretkey', resave: false, saveUninitialized: true,
	cookie: {
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7
	}
}

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
})

const router = require('./routes/router')
const userRoutes = require('./routes/users');
const profileRoutes = require('./routes/user_profiles');
const historyRoutes = require('./routes/game_histories');
app.use(router)
app.use(userRoutes)
app.use(profileRoutes)
app.use(historyRoutes)

// app.use(function (err, req, res, next) {
// 	res.status(500).json({
// 		status: 'fail',
// 		errors: err.message
// 	})
// })

app.all('*', (req, res, next) => {
	next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
	const { StatusCode = 500 } = err;
	if (!err.message) err.message = 'Something Went Wrong!'
	res.status(StatusCode).render('error', { err })
})

const ConnectionMongoDB = require('./config/connection')
ConnectionMongoDB()

server.listen(port, function () {
	console.log(`Server is running in port : ${port}`)
})