const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../util/auth')
const authRouter = require('./auth-router')
router.use('/auth', authRouter)

const { graphqlHTTP } = require('express-graphql')
const schema = require('../schema/schema')

router.post(
  '/graphql',
  isLoggedIn,
  graphqlHTTP((req, res) => {
    return {
      schema,
      graphiql: false,
      context: { req, res },
    }
  })
)

// dev 환경에서만 graphiql 사용
router.get(
  '/graphql',
  graphqlHTTP((req, res, next) => {
    return {
      schema,
      graphiql: true,
      context: { req, res },
    }
  })
)

const { searchInIndex, getSuggestion } = require('../elasticsearch-controller')
router.post('/search', searchInIndex)
router.post('/autosuggest', getSuggestion)
module.exports = router
