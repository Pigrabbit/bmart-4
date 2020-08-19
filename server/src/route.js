const express = require('express')
const router = express.Router()
const { getErrorCode } = require('./errors')

const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema')

router.get(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
    formatError: (err) => {
      const error = getErrorCode(err.message)
      return { message: error.message, statusCode: error.statusCode }
    },
  })
)
router.post(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: false,
  })
)

const searchInIndex = require('./elasticsearch-controller')
router.get('/search/:query', searchInIndex)

module.exports = router
