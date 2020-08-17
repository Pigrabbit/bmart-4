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

const client = require('../config/elasticsearch-config')
const ProductSearchDTO = require('./product-search-dto')

router.get('/search/:query', async (req, res, next) => {
    try {
        const result = await client.search({
            index: 'product',
            body: {
                query: {
                    match: {
                        "name.nori": req.params.query
                    }
                }
            }
        })
        const dtoList = result.body.hits.hits.map((hit, idx) => {
            return new ProductSearchDTO(hit._source)
        })

        res.json(dtoList)
    } catch (error) {
        next(error)
    }
})

module.exports = router