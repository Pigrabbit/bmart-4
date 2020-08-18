const pool = require('../db')

const productListByCategoryResolver = async (parent, args) => {
  const conn = await pool.getConnection()
  try {
    const query = `
        SELECT
          CASE WHEN (SELECT 1 FROM wishlist w where w.product_id = p.id AND w.user_id = ?) = 1
          THEN 'true' ELSE 'false' END as isLiked, 
        p.id, p.name, p.coupang_product_id as coupangProductId, 
        p.category, p.price, p.base_price as basePrice, p.discount_rate as discountRate, 
        p.thumbnail_src as thumbnailSrc, p.stock_count as stockCount, 
        p.sold_count as soldCount, p.description
        FROM product p 
        WHERE  category = ? LIMIT ? OFFSET ?`
    const [rows] = await conn.query(query, [args.userId, args.category, args.limit, args.offset])
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
