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

module.exports = {
  productListByCategoryResolver
}
