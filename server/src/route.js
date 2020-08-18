const express = require('express')
const router = express.Router()

const {
  graphqlHTTP
} = require('express-graphql')
const schema = require('./schema')

router.get('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))
router.post('/graphql', graphqlHTTP({
  schema,
  graphiql: false
}))

const searchInIndex = require('./elasticsearch-controller')
router.get('/search/:query', searchInIndex)

module.exports = router
