const client = require('../config/elasticsearch-config')
const ProductSearchDTO = require('./dto/product-search-dto')

const searchInIndex = async (req, res, next) => {
  try {
    const result = await client.search({
      index: 'product',
      body: {
        query: {
          match: {
            'name.nori': req.params.query
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
}

module.exports = searchInIndex
