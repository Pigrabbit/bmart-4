const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const { logFormat, FILE_PATH } = require('./config/config')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const passportConfig = require('./config/passport-config')

app.use(cors({ origin: '*' }))
app.use(logger(logFormat))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))
app.use(passport.initialize())

require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? FILE_PATH.env_dev : FILE_PATH.env_prod,
})

const router = require('./src/route/route')
app.use('/', router)

app.use('/', (req, res, next) => {
  res.sendFile('public/index.html', { root: __dirname })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err.message })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is Running in ${process.env.MODE} mode`)
})
