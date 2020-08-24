const jwt = require('jsonwebtoken')
const { FILE_PATH } = require('../../config/config')

require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? FILE_PATH.env_dev : FILE_PATH.env_prod,
})

function isLoggedIn(req, res, next) {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'No token' })
  }
  
  const isValid = jwt.verify(token, process.env.JWT_SECRET)
  if (!isValid) {
    res.status(401).json({ message: 'INVALID_TOKEN' })
  }

  const userId = jwt.decode(token).id
  res.locals.userId = userId
  next()
}

module.exports = {
  isLoggedIn,
}
