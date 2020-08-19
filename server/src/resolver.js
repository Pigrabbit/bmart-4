const pool = require('../db')
const { GetProductDTO } = require('./get-product-dto')

const productListByCategoryResolver = async (parent, args) => {
  const conn = await pool.getConnection()
  try {
    const query = `
        SELECT
          CASE WHEN (SELECT 1 FROM wishlist w where w.product_id = p.id AND w.user_id = ?) = 1
          THEN 'true' ELSE 'false' END as is_liked, p.*
        FROM product p 
        WHERE  category = ? LIMIT ? OFFSET ?`
    const [rows] = await conn.query(query, [args.userId, args.category, args.limit, args.offset])
    const result = rows.map((row) => new GetProductDTO(row))

    return result
  } finally {
    conn.release()
  }
}

const productListInCartResolver = async (parent, args) => {
  const conn = await pool.getConnection()
  try {
    const query = `
      SELECT op.id, op.quantity, op.price_sum, p.* 
      FROM order_product op
      JOIN product p ON op.product_id = p.id
      JOIN \`order\` o ON o.id = op.order_id
      WHERE o.user_id = ?;
    `

    const [rows] = await conn.query(query, [args.userId])
    const result = rows.map((row) => ({
      id: row.id,
      quantity: row.quantity,
      priceSum: row.price_sum,
      product: new GetProductDTO(row),
    }))

    return result
  } finally {
    conn.release()
  }
}

const likeProductResolver = async (parent, args) => {
  const conn = await pool.getConnection()

  try {
    const query = 'INSERT INTO wishlist (user_id, product_id) VALUES (?, ?)'

    const [rows] = await conn.query(query, [args.userId, args.productId])

    const { insertId } = rows

    return insertId
  } finally {
    conn.release()
  }
}

const dislikeProductResolver = async (parent, args) => {
  const conn = await pool.getConnection()
  try {
    const query = 'DELETE FROM wishlist WHERE user_id = ? AND product_id = ?'

    const [rows] = await conn.query(query, [args.userId, args.productId])
    const { affectedRows } = rows

    return { success: affectedRows === 1 }
  } finally {
    conn.release()
  }
}

const addProductToCartResolver = async (parent, args) => {
  const conn = await pool.getConnection()
  try {
    const findProductQuery = 'SELECT * FROM product WHERE id = ?'
    const [product] = await conn.query(findProductQuery, [args.productId])
    if (!product.length) return 0

    const totalPrice = product[0].price * args.quantity

    const findOrderQuery = 'SELECT * FROM `order` WHERE user_id = ?'
    const [order] = await conn.query(findOrderQuery, [args.userId])
    if (!order.length) return 0

    const orderId = order[0].id

    const findProductInCart = 'SELECT * FROM order_product WHERE order_id = ? AND product_id = ?'
    const [existProduct] = await conn.query(findProductInCart, [orderId, args.productId])

    // 이미 장바구니에 있는 상품이라면
    if (existProduct.length) {
      const query = `UPDATE order_product SET quantity = ?, price_sum = ? 
        WHERE id = ?`

      const [rows] = await conn.query(query, [
        existProduct[0].quantity + args.quantity,
        existProduct[0].price_sum + totalPrice,
        existProduct[0].id,
      ])
      const { affectedRows } = rows

      return affectedRows === 1 ? existProduct[0].id : 0
    } else {
      const query =
        'INSERT INTO order_product (order_id, product_id, quantity, price_sum) VALUES (?, ?, ?, ?);'

      const [rows] = await conn.query(query, [orderId, args.productId, args.quantity, totalPrice])
      const { insertId } = rows

      return insertId
    }
  } finally {
    conn.release()
  }
}

const modifyProductQuantityResolver = async (parent, args) => {
  const conn = await pool.getConnection()
  try {
    const findProductQuery = 'SELECT * FROM product WHERE id = ?'
    const [product] = await conn.query(findProductQuery, [args.productId])
    if (!product.length) return 0

    const totalPrice = product[0].price * args.quantity

    const query = `UPDATE order_product SET quantity = ?, price_sum = ? 
    WHERE id = ? AND product_id = ?`

    const [rows] = await conn.query(query, [
      args.quantity,
      totalPrice,
      args.orderProductId,
      args.productId,
    ])

    const { affectedRows } = rows
    return { success: affectedRows === 1 }
  } finally {
    conn.release()
  }
}

const deleteProductFromCartResolver = async (parent, args) => {
  const conn = await pool.getConnection()
  try {
    const query = 'DELETE FROM order_product WHERE id = ?'

    const [rows] = await conn.query(query, [args.orderProductId])
    const { affectedRows } = rows

    return { success: affectedRows === 1 }
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
