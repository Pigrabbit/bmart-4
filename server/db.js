const mysql = require('mysql2/promise')
const { FILE_PATH } = require('./config/config')

require('dotenv').config({
  path: process.env.NODE_ENV === 'dev' ? FILE_PATH.env_dev : FILE_PATH.env_prod,
})

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
  timezone: 'Z',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = pool
