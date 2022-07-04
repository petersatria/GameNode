const express = require('express')
const app = express()
const port = 7000
const morgan = require('morgan')

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({
	extended: false
}))

app.listen(port, function () {
	console.log(`Server is running in port : ${port}`)
})

const router = require('./views/routes/router')
app.use(router)

app.use(function (err, req, res, next) {
	res.status(500).json({
		status: 'fail',
		errors: err.message
	})
})