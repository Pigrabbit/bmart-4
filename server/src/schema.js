const { GraphQLSchema, GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')
const pool = require('../db')

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'This represents product in store',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    coupang_product_id: { type: GraphQLNonNull(GraphQLInt) },
    category: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt) },
    base_price: { type: GraphQLInt },
    discount_rate: { type: GraphQLInt },
    thumbnail_src: { type: GraphQLNonNull(GraphQLString) },
    created_at: { type: GraphQLNonNull(GraphQLString) },
    stock_count: { type: GraphQLNonNull(GraphQLInt) },
    sold_count: { type: GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString }
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    productListByCategory: {
      type: new GraphQLList(ProductType),
      description: 'List of products',
      args: {
        category: { type: GraphQLString },
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt }
      },
      resolve: async (parent, args) => {
        // getProductByCategory from db
        const conn = await pool.getConnection()
        try {
          const query = 'SELECT * FROM product WHERE category = ? LIMIT ? OFFSET ?'
          const [rows] = await conn.query(query, [args.category, args.limit, args.offset])

          return rows
        } finally {
          conn.release()
        }
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

module.exports = schema
