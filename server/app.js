const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const { logFormat, FILE_PATH } = require('./config/config')
const cookieParser = require('cookie-parser')

app.use(cors({ origin: '*' }))
app.use(logger(logFormat))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static('public'))

require('dotenv').config({
  path: (process.env.NODE_ENV === 'dev') ? FILE_PATH.env_dev : FILE_PATH.env_prod
})

const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/schema')

app.get('/graphql', graphqlHTTP({ schema, graphiql: true }))
app.post('/graphql', graphqlHTTP({ schema, graphiql: false }))

const client = require('./config/elasticsearch-config')
const ProductSearchDTO = require('./src/product-search-dto')

app.get('/search/:query', async (req, res, next) => {
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
    const hits = result.body.hits.hits.map((hit, idx) => {
      return new ProductSearchDTO(hit._source)
    })
    
    res.json(hits)
  } catch(error) {
    next(error)
  }
})

app.use('/', (req, res, next) => {
  res.sendFile('public/index.html', { root: __dirname })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: err.message })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is Running in ${process.env.MODE} mode`)
})
