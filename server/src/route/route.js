const express = require('express')
const router = express.Router()
const { getErrorCode } = require('../errors')
const { isLoggedIn } = require('../util/auth')
const authRouter = require('./auth-router')
router.use('/auth', authRouter)

const { graphqlHTTP } = require('express-graphql')
const schema = require('../schema/schema')

router.post(
  '/graphql',
  isLoggedIn,
  graphqlHTTP((req, res, next) => {
    return {
      schema,
      graphiql: false,
      context: { req, res, next },
      customFormatErrorFn: (err) => {
        const error = getErrorCode(err.message)
        return { message: error.message, statusCode: error.statusCode }
      },
    }
  })
)

// dev 환경에서만 graphiql 사용
router.get(
  '/graphql',
  graphqlHTTP((req, res, next) => {
    if (process.env.NODE_ENV === 'prod') {
      return next()
    }
    return {
      schema,
      graphiql: true,
      context: { req, res, next },
      customFormatErrorFn: (err) => {
        const error = getErrorCode(err.message)
        return { message: error.message, statusCode: error.statusCode }
      },
    }
  })
)

const searchInIndex = require('../elasticsearch-controller')
router.post('/search', searchInIndex)

module.exports = router
