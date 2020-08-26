const pool = require('../../db')
const { ReasonPhrases } = require('http-status-codes')

const checkoutOrderResolver = async (parent, args, context) => {
  // TODO
  // 먼저 주문이 있는지부터 확인
  // 현재 유저의 is paid 가 false인 주문의 is paid를 true로 업데이트
  const { res } = await context
  const userId = res.locals.userId

  const conn = await pool.getConnection()

  try {
    await conn.beginTransaction()
    const findUnpaidOrderQuery = 'SELECT * FROM `order` WHERE user_id = ? and is_paid = 0'

    const [orders] = await conn.query(findUnpaidOrderQuery, [userId])
    if (!orders.length) return new Error(ReasonPhrases.BAD_REQUEST)

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

module.exports = {
  checkoutOrderResolver,
}
