const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { FILE_PATH } = require('../../config/config')

require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? FILE_PATH.env_dev : FILE_PATH.env_prod,
})

router.get('/login', (req, res, next) => {
  // do something with passport
  res.json({ message: 'login router' })
})

// auth logout
router.get('/logout', (req, res, next) => {
  // handle with passport
  res.json({ messsage: 'logout router' })
})

// google auth
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
)

router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
  console.log('google redirect')
  const payload = { id: req.user.id }
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  res
    .status(200)
    .cookie('token', token, {
      // expires after 7 days (1 week)
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .redirect('http://localhost:3000/login')
})

module.exports = router
