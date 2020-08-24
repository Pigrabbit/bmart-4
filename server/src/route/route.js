const express = require('express')
const router = express.Router()
const { getErrorCode } = require('../errors')
const authRouter = require('./auth-router')
router.use('/auth', authRouter)

const { graphqlHTTP } = require('express-graphql')
const schema = require('../schema/schema')

// dev 환경에서만 graphiql 사용
if (process.env.NODE_ENV === 'dev') {
  router.get(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: true,
      customFormatErrorFn: (err) => {
        const error = getErrorCode(err.message)
        return { message: error.message, statusCode: error.statusCode }
      },
    })
  )
}

router.post(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
    customFormatErrorFn: (err) => {
      const error = getErrorCode(err.message)
      return { message: error.message, statusCode: error.statusCode }
    },
  })
)

const searchInIndex = require('../elasticsearch-controller')
router.post('/search', searchInIndex)

module.exports = router
