const pool = require('../../db')
const { ReasonPhrases } = require('http-status-codes')

const likeProductResolver = async (parent, args, context) => {
  const { res } = await context
  const userId = res.locals.userId

  const { productId } = args
  const conn = await pool.getConnection()

  try {
    const query = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)'

    const [rows] = await conn.query(query, [userId, productId])

    const { insertId } = rows

    return insertId
  } catch (err) {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const dislikeProductResolver = async (parent, args, context) => {
  const res = await context.res
  const userId = res.locals.userId

  const { productId } = args
  const conn = await pool.getConnection()

  try {
    const query = 'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?'

    const [rows] = await conn.query(query, [userId, productId])
    const { affectedRows } = rows

    return { success: affectedRows === 1 }
  } catch (err) {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

module.exports = {
  likeProductResolver,
  dislikeProductResolver,
}
