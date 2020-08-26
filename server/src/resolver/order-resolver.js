const pool = require('../../db')
const { ReasonPhrases } = require('http-status-codes')

const checkoutOrderResolver = async (parent, args, context) => {
  const { res } = await context
  const userId = res.locals.userId

  const conn = await pool.getConnection()

  try {
    await conn.beginTransaction()
    const findUnpaidOrderQuery = 'SELECT * FROM `order` WHERE user_id = ? and is_paid = 0'

    const [orders] = await conn.query(findUnpaidOrderQuery, [userId])
    if (!orders.length) throw new Error(ReasonPhrases.BAD_REQUEST)

    const checkoutOrderQuery = 'UPDATE `order` SET is_paid = 1 WHERE user_id = ?'

    const [rows] = await conn.query(checkoutOrderQuery, [userId])
    const { affectedRows } = rows

    await conn.commit()
    return { success: affectedRows === 1 }
  } catch (error) {
    conn.rollback()
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const orderHistoryListResolver = async (parent, args, context) => {
  const { res } = await context
  const userId = res.locals.userId

  const conn = await pool.getConnection()

  try {
    const query = 'SELECT * FROM `order` WHERE user_id = ? and is_paid = 1'
    const [rows] = await conn.query(query, [userId])

    return rows
  } catch {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

module.exports = {
  checkoutOrderResolver,
  orderHistoryListResolver,
}
