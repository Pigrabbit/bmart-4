const {
  FILE_PATH
} = require('./config')

require('dotenv').config({
  path: (process.env.NODE_ENV === 'dev') ? FILE_PATH.env_dev : FILE_PATH.env_prod
})

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: process.env.ELASTICSEARCH_ENDPOINT,
  auth: {
    apiKey: process.env.ELASTICSEARCH_API_KEY_NEW
  },
  compression: 'gzip'
})

module.exports = client
