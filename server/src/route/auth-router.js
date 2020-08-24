const express = require('express')
const router = express.Router()
const passport = require('passport')

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
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get('/google/redirect', passport.authenticate('google'), (req, res, next) => {
  res.json({ message: 'google oauth' })
  // TODO
  // sign jwt token here
  // and send to client
})

module.exports = router
