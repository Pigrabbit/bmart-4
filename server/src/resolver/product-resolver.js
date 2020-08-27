const pool = require('../../db')
const { GetProductDTO } = require('../dto/get-product-dto')
const { GetProductDetailDTO } = require('../dto/get-product-detail-dto')
const { ReasonPhrases } = require('http-status-codes')

const getProductById = async (parent, args, context) => {
  const res = await context.res
  const userId = res.locals.userId
  const { id } = args

  const conn = await pool.getConnection()
  try {
    const query = `
      SELECT
      CASE WHEN (SELECT 1 FROM wishlist w where w.product_id = p.id AND w.user_id = ?) = 1
      THEN 'true' ELSE 'false' END as is_liked, p.*
      FROM product p WHERE id = ?
    `
    const [rows] = await conn.query(query, [userId, id])

    return new GetProductDTO(rows[0])
  } catch {
    throw new Error(ReasonPhrases.NOT_FOUND)
  } finally {
    conn.release()
  }
}

const getProductListDiscountRateDesc = async (parent, args, context) => {
  const res = await context.res
  const userId = res.locals.userId

  const { offset = 0, limit = 10 } = args
  if (offset < 0 || limit < 0) {
    return new Error(ReasonPhrases.BAD_REQUEST)
  }
  const conn = await pool.getConnection()
  try {
    const query = `
      SELECT
        CASE WHEN (SELECT 1 FROM wishlist w WHERE w.product_id = p.id AND w.user_id = ?) = 1
        THEN 'true' ELSE 'false' END as is_liked, p.*
      FROM product p 
      ORDER BY p.discount_rate DESC
      LIMIT ? OFFSET ?
    `
    const [rows] = await conn.query(query, [userId, limit, offset])
    const result = rows.map((row) => new GetProductDTO(row))

    return result
  } catch {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const productListByCategoryResolver = async (parent, args, context) => {
  const res = await context.res
  const userId = res.locals.userId
  const { category, offset = 0, limit = 10, sorter = '' } = args

  if (offset < 0 || limit < 0) {
    return new Error(ReasonPhrases.BAD_REQUEST)
  }

  const conn = await pool.getConnection()

  let orderByQuery = ''
  switch (sorter) {
    case 'priceAsc': {
      orderByQuery = 'ORDER BY p.price ASC'
      break
    }
    case 'priceDesc': {
      orderByQuery = 'ORDER BY p.price DESC'
      break
    }
  }

  try {
    const query = `
        SELECT
          CASE WHEN (SELECT 1 FROM wishlist w where w.product_id = p.id AND w.user_id = ?) = 1
          THEN 'true' ELSE 'false' END as is_liked, p.*
        FROM product p 
        WHERE category = ? ${orderByQuery} LIMIT ? OFFSET ?
        `
    const [rows] = await conn.query(query, [userId, category, limit, offset])
    const result = rows.map((row) => new GetProductDTO(row))

    return result
  } catch (err) {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const getDetailImgSrcByProductId = async (parent, args) => {
  const { id } = args
  const conn = await pool.getConnection()
  try {
    const query = `
      SELECT i.* FROM product_detail_image i
      JOIN product p
      ON i.coupang_product_id = p.coupang_product_id
      WHERE p.id= ?
    `
    const [rows] = await conn.query(query, [id])

    const result = rows.map((row) => new GetProductDetailDTO(row))

    return result
  } catch {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const getOrderProductById = async (parent, args, context) => {
  const { id } = parent
  const conn = await pool.getConnection()

  try {
    const query = `SELECT * FROM product p JOIN order_product op 
    ON p.id = op.product_id WHERE op.order_id = ?`
    const [rows] = await conn.query(query, [id])

    const result = rows.map((row) => new GetProductDTO(row))

    return result
  } catch {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

const likedProductListResolver = async (parent, args, context) => {
  const conn = await pool.getConnection()
  try {
    const res = await context.res
    const userId = res.locals.userId
    const { offset = 0, limit = 20 } = args

    const query = ` SELECT p.*, "true" as is_liked  
      FROM wishlist w JOIN product p 
      ON w.product_id = p.id 
      WHERE w.user_id = ? LIMIT ? OFFSET ?
    `
    const [rows] = await conn.query(query, [userId, limit, offset])

    const result = rows.map((row) => new GetProductDTO(row))

    return result
  } catch {
    throw new Error(ReasonPhrases.INTERNAL_SERVER_ERROR)
  } finally {
    conn.release()
  }
}

module.exports = {
  getProductById,
  getProductListDiscountRateDesc,
  productListByCategoryResolver,
  getDetailImgSrcByProductId,
  likedProductListResolver,
  getOrderProductById,
}
