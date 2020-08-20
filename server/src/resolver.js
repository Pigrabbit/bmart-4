const pool = require('../db')
const { GetProductDTO } = require('./get-product-dto')
const { errorName } = require('./errors/error-type')

const productListByCategoryResolver = async (parent, args) => {
  const { userId, category, offset = 0, limit = 10, sorter = 0 } = args
  if (offset < 0 || limit < 0) {
    throw new Error(errorName.BAD_REQUEST)
  }

  const conn = await pool.getConnection()

  try {
    const query = `
        SELECT
          CASE WHEN (SELECT 1 FROM wishlist w where w.product_id = p.id AND w.user_id = ?) = 1
          THEN 'true' ELSE 'false' END as is_liked, p.*
        FROM product p 
        WHERE category = ? ${
          sorter === 0 ? '' : sorter === 1 ? 'ORDER BY p.price ASC' : 'ORDER BY p.price DESC'
        } LIMIT ? OFFSET ?
        `
    const [rows] = await conn.query(query, [userId, category, limit, offset])
    const result = rows.map((row) => new GetProductDTO(row))

    return result
  } catch (err) {
    throw new Error(errorName.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const productListInCartResolver = async (parent, args) => {
  const { userId } = args
  const conn = await pool.getConnection()

  try {
    const query = `
      SELECT op.id orderProductId, op.quantity, op.price_sum, p.* 
      FROM order_product op
      JOIN product p ON op.product_id = p.id
      JOIN \`order\` o ON o.id = op.order_id
      WHERE o.user_id = ?;
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
    throw new Error(errorName.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

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

const addProductToCartResolver = async (parent, args) => {
  const { userId, productId, quantity } = args
  if (quantity <= 0) {
    throw new Error(errorName.BAD_REQUEST)
  }

  const conn = await pool.getConnection()

  try {
    const findProductQuery = 'SELECT * FROM product WHERE id = ?'
    const [product] = await conn.query(findProductQuery, [productId])
    if (!product.length) return 0

    const totalPrice = product[0].price * quantity

    const findOrderQuery = 'SELECT * FROM `order` WHERE user_id = ?'
    const [order] = await conn.query(findOrderQuery, [userId])
    if (!order.length) return 0

    const orderId = order[0].id

    const findProductInCart = 'SELECT * FROM order_product WHERE order_id = ? AND product_id = ?'
    const [existProduct] = await conn.query(findProductInCart, [orderId, productId])

    // 이미 장바구니에 있는 상품이라면
    if (existProduct.length) {
      const query = `UPDATE order_product SET quantity = ?, price_sum = ? 
        WHERE id = ?`

      const [rows] = await conn.query(query, [
        existProduct[0].quantity + quantity,
        existProduct[0].price_sum + totalPrice,
        existProduct[0].id,
      ])
      const { affectedRows } = rows

      return affectedRows === 1 ? existProduct[0].id : 0
    } else {
      const query =
        'INSERT INTO order_product (order_id, product_id, quantity, price_sum) VALUES (?, ?, ?, ?);'

      const [rows] = await conn.query(query, [orderId, productId, quantity, totalPrice])
      const { insertId } = rows

      return insertId
    }
  } catch (err) {
    throw new Error(errorName.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const modifyProductQuantityResolver = async (parent, args) => {
  const { productId, orderProductId, quantity } = args
  if (quantity <= 0) {
    throw new Error(errorName.BAD_REQUEST)
  }

  const conn = await pool.getConnection()

  try {
    const findProductQuery = 'SELECT * FROM product WHERE id = ?'
    const [product] = await conn.query(findProductQuery, [productId])
    if (!product.length) return 0

    const totalPrice = product[0].price * quantity

    const query = `UPDATE order_product SET quantity = ?, price_sum = ? 
    WHERE id = ? AND product_id = ?`

    const [rows] = await conn.query(query, [quantity, totalPrice, orderProductId, productId])

    const { affectedRows } = rows
    return { success: affectedRows === 1 }
  } catch (err) {
    throw new Error(errorName.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const deleteProductFromCartResolver = async (parent, args) => {
  const { orderProductId } = args
  const conn = await pool.getConnection()

  try {
    const query = 'DELETE FROM order_product WHERE id = ?'

    const [rows] = await conn.query(query, [orderProductId])
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
  productListByCategoryResolver,
  productListInCartResolver,
  addProductToCartResolver,
  modifyProductQuantityResolver,
  deleteProductFromCartResolver,
}
