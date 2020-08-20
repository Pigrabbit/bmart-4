const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql')

const { ProductType, CartProductType, changeStatusMessageType } = require('./type')
const {
  likeProductResolver,
  dislikeProductResolver,
  productListByCategoryResolver,
  addProductToCartResolver,
  modifyProductQuantityResolver,
  deleteProductFromCartResolver,
  productListInCartResolver,
} = require('./resolver')

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
        sorter: { type: GraphQLInt },
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
  }),
})

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    likeProduct: {
      type: GraphQLNonNull(GraphQLID),
      description: '유저 찜하기 기능',
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        productId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: likeProductResolver,
    },
    dislikeProduct: {
      type: changeStatusMessageType,
      description: '유저 찜 취소 기능',
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        productId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: dislikeProductResolver,
    },
    addProductToCart: {
      type: GraphQLNonNull(GraphQLID),
      description: '카트에 담기 기능',
      args: {
        userId: { type: GraphQLNonNull(GraphQLID) },
        productId: { type: GraphQLNonNull(GraphQLID) },
        quantity: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: addProductToCartResolver,
    },
    modifyProductQuantity: {
      type: changeStatusMessageType,
      description: '카트에 담긴 상품 수량 수정 기능',
      args: {
        productId: { type: GraphQLNonNull(GraphQLID) },
        orderProductId: { type: GraphQLNonNull(GraphQLID) },
        quantity: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve: modifyProductQuantityResolver,
    },
    deleteProductFromCart: {
      type: changeStatusMessageType,
      description: '카트에 담긴 상품 삭제 기능',
      args: {
        orderProductIds: { type: GraphQLNonNull(GraphQLList(GraphQLID)) },
      },
      resolve: deleteProductFromCartResolver,
    },
  }),
})

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
})

module.exports = schema
