const pool = require('../../db')
const { errorName } = require('../errors/error-type')

const likeProductResolver = async (parent, args) => {
  const { userId, productId } = args
  const conn = await pool.getConnection()

  try {
    const query = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)'

    const [rows] = await conn.query(query, [userId, productId])

    const { insertId } = rows

    return insertId
  } catch (err) {
    throw new Error(errorName.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const dislikeProductResolver = async (parent, args) => {
  const { userId, productId } = args
  const conn = await pool.getConnection()

  try {
    const query = 'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?'

    const [rows] = await conn.query(query, [userId, productId])
    const { affectedRows } = rows

    return { success: affectedRows === 1 }
  } catch (err) {
    throw new Error(errorName.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

module.exports = {
  likeProductResolver,
  dislikeProductResolver,
}
