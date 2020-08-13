const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql')

const { ProductType } = require('./type')
const { productListByCategoryResolver } = require('./resolver')

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
      resolve: productListByCategoryResolver
    }
    // TODO
    // Add productList field
    // Add wishlist field
    // Add order field
  })
})

const schema = new GraphQLSchema({
  query: RootQueryType
})

module.exports = schema
