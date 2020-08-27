const pool = require('../../db')
const { ReasonPhrases } = require('http-status-codes')
const { GetOrderHistoryDTO } = require('../dto/get-order-history-dto')

// TODO
// arguments로 들어온 id에 해당하는 상품들만 결제하기
// order에 포함되어 있는 order_product 중 결제가 되지 않은 상품들은
// 새로운 order를 생성한 다음 그 order의 id로 업데이트
const checkoutOrderResolver = async (parent, args, context) => {
  const { res } = await context
  const userId = res.locals.userId
  const { orderProductList } = args

  const conn = await pool.getConnection()

  try {
    await conn.beginTransaction()

    // 0. is_paid가 0인 order SELECT
    // 1. OrderProductId로 들어온 상품들 op.is_paid = true,
    //        p.stock_count -= quantity,
    //        p.sold_count += quantity로 UPDATE
    // 2. o.is_paid = true 로 UPDATE
    // 3. order에 포함된 상품 중 args로 받은 Id와 일치하지 않는 상품들이 없으면 종료 -> SELECT 결과 길이로 판별
    // 3-1. 있으면 새로운 order record insert
    // 3-2. 해당 상품들의 op.order_id 를 새로운 record 의 id 값으로 UPDATE

    const findUnpaidOrderQuery = 'SELECT * FROM `order` WHERE user_id = ? and is_paid = 0'
    const [orders] = await conn.query(findUnpaidOrderQuery, [userId])
    if (!orders.length) return new Error(ReasonPhrases.BAD_REQUEST)

    const currentOrderId = orders[0].id

    for (const orderProduct of orderProductList) {
      const { productId, orderProductId, quantity } = orderProduct
      const updateCountQuery = `
          UPDATE product p SET
          p.stock_count = p.stock_count - ?, 
          p.sold_count = p.sold_count + ?
          WHERE p.id = ?
      `
      await conn.query(updateCountQuery, [quantity, quantity, productId])

      const updateIsPaidQuery = 'UPDATE order_product op SET op.is_paid = 1 WHERE id = ?'
      await conn.query(updateIsPaidQuery, [orderProductId])
    }

    const updateOrderIsPaidQuery = 'UPDATE `order` o SET o.is_paid = 1 WHERE id = ?'
    await conn.query(updateOrderIsPaidQuery, [currentOrderId])

    const selectUnpaidOrderQuery =
      'SELECT * FROM order_product op WHERE op.order_id = ? AND op.is_paid = 0'
    const [rows] = await conn.query(selectUnpaidOrderQuery, [currentOrderId])

    if (rows.length === 0) {
      await conn.commit()
      return { success: true }
    }

    const insertNewOrderQuery = 'INSERT INTO `order` (user_id, is_paid) VALUES (?, ?)'
    const [newOrder] = await conn.query(insertNewOrderQuery, [userId, 0])
    const { insertId } = newOrder

    const moveUnpaidOrderProductToNewOrderQuery = `
      UPDATE order_product op SET op.order_id = ? WHERE op.is_paid = 0 AND op.order_id = ?
    `
    await conn.query(moveUnpaidOrderProductToNewOrderQuery, [insertId, currentOrderId])
    await conn.commit()

    return { success: true }
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
    const query = 'SELECT * FROM `order` WHERE user_id = ? and is_paid = 1 ORDER BY ordered_at DESC'
    const [rows] = await conn.query(query, [userId])
    const result = rows.map((row) => new GetOrderHistoryDTO(row))

    return result
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
