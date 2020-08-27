const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql')

const { changeStatusMessageType, OrderProductInputType } = require('../type')

const { likeProductResolver, dislikeProductResolver } = require('../resolver/like-resolver')
const {
  addProductToCartResolver,
  modifyProductQuantityResolver,
  deleteProductFromCartResolver,
} = require('../resolver/cart-resolver')
const { checkoutOrderResolver } = require('../resolver/order-resolver')

const RootMutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'Root Mutation',
  fields: () => ({
    likeProduct: {
      type: GraphQLNonNull(GraphQLID),
      description: '유저 찜하기 기능',
      args: {
        productId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: likeProductResolver,
    },
    dislikeProduct: {
      type: changeStatusMessageType,
      description: '유저 찜 취소 기능',
      args: {
        productId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve: dislikeProductResolver,
    },
    addProductToCart: {
      type: GraphQLNonNull(GraphQLID),
      description: '카트에 담기 기능',
      args: {
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
    checkoutOrder: {
      type: changeStatusMessageType,
      description: '결제하기 기능',
      args: {
        orderProductList: { type: new GraphQLList(OrderProductInputType) }
      },
      resolve: checkoutOrderResolver,
    },
  }),
})

module.exports = { RootMutationType }
