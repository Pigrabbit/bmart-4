const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')

const { ProductType, CartProductType, ProductDetailImgType } = require('../type')

const {
  productListByCategoryResolver,
  productDetailImgResolver,
} = require('../resolver/product-resolver')
const { productListInCartResolver } = require('../resolver/cart-resolver')

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    productListByCategory: {
      type: new GraphQLList(ProductType),
      description: 'List of products',
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        category: { type: GraphQLString },
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
        sorter: { type: GraphQLString },
      },
      resolve: productListByCategoryResolver,
    },
    productListInCart: {
      type: new GraphQLList(CartProductType),
      description: '장바구니 상품 리스트',
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: productListInCartResolver,
    },
    productDetailImgList: {
      type: new GraphQLList(ProductDetailImgType),
      description: '상품 상세 이미지 src',
      args: {
        coupangProductId: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: productDetailImgResolver,
    },
  }),
})

module.exports = { RootQueryType }
