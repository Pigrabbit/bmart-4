const pool = require('../../db')
const { GetProductDTO } = require('../dto/get-product-dto')
const { ReasonPhrases } = require('http-status-codes')

const productListInCartResolver = async (parent, args, context) => {
  const res = await context.res
  const userId = res.locals.userId

  const conn = await pool.getConnection()

  try {
    const query = `
      SELECT op.id orderProductId, op.quantity, op.price_sum, p.* 
      FROM order_product op
      JOIN product p ON op.product_id = p.id
      JOIN \`order\` o ON o.id = op.order_id
      WHERE o.user_id = ? AND o.is_paid = 0;
    `

    const [rows] = await conn.query(query, [userId])
    const result = rows.map((row) => ({
      id: row.orderProductId,
      quantity: row.quantity,
      priceSum: row.price_sum,
      product: new GetProductDTO(row),
    }))

    return result
  } catch (err) {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const productIdsInCartResolver = async (parent, args, context) => {
  const res = await context.res
  const userId = res.locals.userId
  const conn = await pool.getConnection()

  try {
    const query = `
      SELECT p.id as id FROM \`order\` o 
      JOIN order_product op ON o.id = op.order_id
      JOIN product p ON p.id = op.product_id
      WHERE o.user_id = ? AND o.is_paid = 0;
    `

    const [rows] = await conn.query(query, [userId])

    const result = rows.map((r) => r.id)

    return result
  } catch (err) {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const productListInOrderResolver = async (parent, args, context) => {
  const { id } = parent
  const conn = await pool.getConnection()

  try {
    const query = `
      SELECT op.id orderProductId, op.quantity, op.price_sum, p.* 
      FROM order_product op
      JOIN product p ON op.product_id = p.id
      JOIN \`order\` o ON o.id = op.order_id
      WHERE o.id = ?;
    `

    const [rows] = await conn.query(query, [id])

    const result = rows.map((row) => ({
      id: row.orderProductId,
      quantity: row.quantity,
      priceSum: row.price_sum,
      product: new GetProductDTO(row),
    }))

    return result
  } catch (err) {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const addProductToCartResolver = async (parent, args, context) => {
  const res = await context.res
  const userId = res.locals.userId

  const { productId, quantity } = args
  if (quantity <= 0) {
    return new Error(ReasonPhrases.BAD_REQUEST)
  }

  const conn = await pool.getConnection()

  try {
    await conn.beginTransaction()
    const findProductQuery = 'SELECT * FROM product WHERE id = ?'
    const [product] = await conn.query(findProductQuery, [productId])
    if (!product.length) return 0

    const totalPrice = product[0].price * quantity

    const findOrderQuery = 'SELECT * FROM `order` WHERE user_id = ? and is_paid = 0'
    const [order] = await conn.query(findOrderQuery, [userId])
    let orderId = null
    if (!order.length) {
      const createOrderQuery = 'INSERT INTO `order` (user_id, is_paid) VALUES (?, ?)'
      const [rows] = await conn.query(createOrderQuery, [userId, 0])
      const { insertId } = rows
      orderId = insertId
    } else {
      orderId = order[0].id
    }

    const findProductInCart = 'SELECT * FROM order_product WHERE order_id = ? AND product_id = ?'
    const [existProduct] = await conn.query(findProductInCart, [orderId, productId])

    // 이미 장바구니에 있는 상품이라면
    if (existProduct.length) {
      if (existProduct[0].quantity + quantity > 10) {
        return new Error(ReasonPhrases.BAD_REQUEST)
      }

      const query = `UPDATE order_product SET quantity = ?, price_sum = ? 
        WHERE id = ?`

      const [rows] = await conn.query(query, [
        existProduct[0].quantity + quantity,
        existProduct[0].price_sum + totalPrice,
        existProduct[0].id,
      ])
      const { affectedRows } = rows

      await conn.commit()
      return affectedRows === 1 ? existProduct[0].id : 0
    } else {
      const query =
        'INSERT INTO order_product (order_id, product_id, quantity, price_sum) VALUES (?, ?, ?, ?);'

      const [rows] = await conn.query(query, [orderId, productId, quantity, totalPrice])
      const { insertId } = rows

      await conn.commit()
      return insertId
    }
  } catch (err) {
    conn.rollback()
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const modifyProductQuantityResolver = async (parent, args) => {
  const { productId, orderProductId, quantity } = args
  if (quantity <= 0) {
    return new Error(ReasonPhrases.BAD_REQUEST)
  }

  const conn = await pool.getConnection()

  try {
    const findProductQuery = 'SELECT * FROM product WHERE id = ?'
    const [product] = await conn.query(findProductQuery, [productId])
    if (!product.length) return new Error(ReasonPhrases.NOT_FOUND)

    const totalPrice = product[0].price * quantity

    const query = `UPDATE order_product SET quantity = ?, price_sum = ? 
    WHERE id = ? AND product_id = ?`

    const [rows] = await conn.query(query, [quantity, totalPrice, orderProductId, productId])

    const { affectedRows } = rows
    return { success: affectedRows === 1 }
  } catch (err) {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const deleteProductFromCartResolver = async (parent, args) => {
  const { orderProductIds } = args
  const conn = await pool.getConnection()

  try {
    const query = 'DELETE FROM order_product WHERE id = ?'
    let deletedRows = 0

    for (const orderProductId of orderProductIds) {
      const [rows] = await conn.query(query, [orderProductId])
      const { affectedRows } = rows
      deletedRows += affectedRows
    }

    return { success: deletedRows === orderProductIds.length }
  } catch (err) {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

module.exports = {
  productListInCartResolver,
  productListInOrderResolver,
  productIdsInCartResolver,
  addProductToCartResolver,
  modifyProductQuantityResolver,
  deleteProductFromCartResolver,
}
