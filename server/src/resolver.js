const pool = require('../db')

const productListByCategoryResolver = async (parent, args) => {
  const conn = await pool.getConnection()
  try {
    const query = `SELECT 
        id, name, coupang_product_id as coupangProductId, category, price,
        base_price as basePrice, discount_rate as discountRate, thumbnail_src as thumbnailSrc,
        stock_count as stockCount, sold_count as soldCount, description
        FROM product WHERE category = ? LIMIT ? OFFSET ?`
    const [rows] = await conn.query(query, [args.category, args.limit, args.offset])
    return rows
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

module.exports = {
  likeProductResolver,
  dislikeProductResolver,
  productListByCategoryResolver,
}
