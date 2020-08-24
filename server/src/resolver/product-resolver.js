const pool = require('../../db')
const { GetProductDTO } = require('../dto/get-product-dto')
const { GetProductDetailDTO } = require('../dto/get-product-detail-dto')
const { errorName } = require('../errors/error-type')

const productListByCategoryResolver = async (parent, args) => {
  const { userId, category, offset = 0, limit = 10, sorter = 'sellCountDesc' } = args
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
          sorter === 'sellCountDesc'
            ? ''
            : sorter === 'priceAsc'
            ? 'ORDER BY p.price ASC'
            : 'ORDER BY p.price DESC'
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

const productDetailImgResolver = async (parent, args) => {
  const { coupangProductId } = args
  const conn = await pool.getConnection()
  try {
    const query = 'SELECT * FROM product_detail_image WHERE coupang_product_id=?'
    const [rows] = await conn.query(query, [coupangProductId])

    const result = rows.map((row) => new GetProductDetailDTO(row))

    return result
  } catch {
    throw new Error(errorName.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

module.exports = {
  productListByCategoryResolver,
  productDetailImgResolver,
}
