const { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt } = require('graphql')

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'This represents product in store',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    name: { type: GraphQLNonNull(GraphQLString) },
    coupangProductId: { type: GraphQLNonNull(GraphQLInt) },
    category: { type: GraphQLNonNull(GraphQLString) },
    price: { type: GraphQLNonNull(GraphQLInt) },
    basePrice: { type: GraphQLInt },
    discountRate: { type: GraphQLInt },
    thumbnailSrc: { type: GraphQLNonNull(GraphQLString) },
    createdAt: { type: GraphQLNonNull(GraphQLString) },
    stockCount: { type: GraphQLNonNull(GraphQLInt) },
    soldCount: { type: GraphQLNonNull(GraphQLInt) },
    description: { type: GraphQLString }
  })
})

// TODO
// Add UserType
// Add OrderType
// Add OrderProductType
// Add WishlistType

module.exports = {
  ProductType
}
