const express = require('express')
const router = express.Router()

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
router.get('/google', (req, res, next) => {
  // handle with passport
  res.json({ messsage: 'oauth with google' })
})

module.exports = router
