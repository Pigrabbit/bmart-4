const client = require('../config/elasticsearch-config')
const ProductSearchDTO = require('./dto/product-search-dto')
const { MAX_SEARCH_RESULT_COUNT } = require('./util/constants')

const searchInIndex = async (req, res, next) => {
  try {
    const result = await client.search({
      index: 'product',
      size: MAX_SEARCH_RESULT_COUNT,
      body: {
        query: {
          match: {
            'name.nori': req.body.query
          }
        }
      }
    })
    console.log(result.body.hits.hits.length)
    const dtoList = result.body.hits.hits.map((hit, idx) => {
      return new ProductSearchDTO(hit._source)
    })

    res.json(dtoList)
  } catch (error) {
    next(error)
  }
}

module.exports = searchInIndex
