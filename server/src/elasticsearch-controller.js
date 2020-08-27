const client = require('../config/elasticsearch-config')
const ProductSearchDTO = require('./dto/product-search-dto')
const { MAX_SEARCH_RESULT_COUNT, MAX_SUGGESTION } = require('./util/constants')
const GetAutoSuggestDTO = require('./dto/get-auto-suggest-dto')

const searchInIndex = async (req, res, next) => {
  try {
    const result = await client.search({
      index: 'product',
      size: MAX_SEARCH_RESULT_COUNT,
      body: {
        query: {
          match: {
            'name.nori': req.body.query,
          },
        },
      },
    })
    const dtoList = result.body.hits.hits.map((hit, idx) => {
      return new ProductSearchDTO(hit._source)
    })

    res.json(dtoList)
  } catch (error) {
    next(error)
  }
}

const getSuggestion = async (req, res, next) => {
  try {
    const result = await client.search({
      index: 'product-auto',
      size: MAX_SUGGESTION,
      body: {
        query: {
          match: {
            'name.nori': req.body.query,
          },
        },
      },
    })
    const dtoList = result.body.hits.hits.map((hit, idx) => {
      return new GetAutoSuggestDTO(hit._source)
    })

    res.json(dtoList)
  } catch (error) {
    next(error)
  }
}

module.exports = { searchInIndex, getSuggestion }
