const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { FILE_PATH } = require('../../config/config')

require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? FILE_PATH.env_dev : FILE_PATH.env_prod,
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
  const payload = { id: req.user.id, firstname: req.user.firstname, lastname: req.user.lastname }
  const token = jwt.sign(payload, process.env.JWT_SECRET)
  res
    .status(200)
    .cookie('token', token, {
      // expires after 7 days (1 week)
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    })
    .redirect(process.env.CLIENT_OAUTH_REDIRECT_URI)
})

module.exports = router
