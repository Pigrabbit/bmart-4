const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql')

const { ProductType, CartProductType, ProductDetailImgType, OrderType } = require('../type')

const {
  productListByCategoryResolver,
  getDetailImgSrcByProductId,
  likedProductListResolver,
} = require('../resolver/product-resolver')
const { productListInCartResolver } = require('../resolver/cart-resolver')
const { orderHistoryListResolver } = require('../resolver/order-resolver')

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
        limit: { type: GraphQLInt },
        sorter: { type: GraphQLString },
      },
      resolve: productListByCategoryResolver,
    },
    productListInCart: {
      type: new GraphQLList(CartProductType),
      description: '장바구니 상품 리스트',
      resolve: productListInCartResolver,
    },
    productDetailImgList: {
      type: new GraphQLList(ProductDetailImgType),
      description: '상품 상세 이미지 src',
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: getDetailImgSrcByProductId,
    },
    likedProductList: {
      type: new GraphQLList(ProductType),
      description: '찜한 상품 리스트',
      args: {
        offset: { type: GraphQLInt },
        limit: { type: GraphQLInt },
      },
      resolve: likedProductListResolver,
    },
    orderHistoryList: {
      type: new GraphQLList(OrderType),
      description: '',
      resolve: orderHistoryListResolver,
    },
  }),
})

module.exports = { RootQueryType }
