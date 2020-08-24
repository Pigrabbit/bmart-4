const express = require('express')
const router = express.Router()
const { getErrorCode } = require('../errors')
const { isLoggedIn } = require('../util/auth')
const authRouter = require('./auth-router')
router.use('/auth', authRouter)

const { graphqlHTTP } = require('express-graphql')
const schema = require('../schema/schema')

// dev 환경에서만 graphiql 사용
if (process.env.NODE_ENV === 'dev') {
  router.get(
    '/graphql',
    graphqlHTTP((req, res) => {
      return {
        schema,
        graphiql: true,
        context: { req, res },
        customFormatErrorFn: (err) => {
          const error = getErrorCode(err.message)
          return { message: error.message, statusCode: error.statusCode }
        },
      }
    })
  )
}

router.post(
  '/graphql',
  isLoggedIn,
  graphqlHTTP((req, res) => {
    return {
      schema,
      graphiql: false,
      context: { req, res },
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
