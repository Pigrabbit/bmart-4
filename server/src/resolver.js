const pool = require('../db')

const getProductByCategoryResolver = async (parent, args) => {
    const conn = await pool.getConnection()
    try {
        const query = 'SELECT * FROM product WHERE category = ? LIMIT ? OFFSET ?'
        const [rows] = await conn.query(query, [args.category, args.limit, args.offset])
        return rows
    } finally {
        conn.release()
    }
}

module.exports = {
    getProductByCategoryResolver
}