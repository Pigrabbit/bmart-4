const {
    FILE_PATH
} = require('./config')

require('dotenv').config({
    path: (process.env.NODE_ENV === 'dev') ? FILE_PATH.env_dev : FILE_PATH.env_prod
})

const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: 'https://237c8fcb276c4254be1e1124b7189e55.ap-northeast-2.aws.elastic-cloud.com:9243',
    auth: {
        apiKey: process.env.ELASTICSEARCH_API_KEY
    },
    compression: 'gzip'
})

module.exports = client
