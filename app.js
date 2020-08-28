const express = require('express')
// Extensions
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
// Routes
const authRoutes = require('./routes/auth')
const analyticsRoutes = require('./routes/analytics')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const positionRoutes = require('./routes/position.js')
const app = express()
// Config
const keys = require('./config/keys')

// Database connection
mongoose.connect(keys.mongoURI)
	.then(()=>console.log('Mongodb connected successfully'))
	.catch(error => console.log(error))
// Passport Setup
app.use(passport.initialize())
require('./middleware/passport')(passport)

//Extensions
app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/position', positionRoutes)

module.exports = app;
