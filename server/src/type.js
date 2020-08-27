const {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
} = require('graphql')
const { productListInOrderResolver } = require('./resolver/cart-resolver')

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
    description: { type: GraphQLString },
    isLiked: { type: GraphQLNonNull(GraphQLBoolean) },
  }),
})

const CartProductType = new GraphQLObjectType({
  name: 'CartProduct',
  description: 'This represents product in cart',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    quantity: { type: GraphQLNonNull(GraphQLInt) },
    priceSum: { type: GraphQLNonNull(GraphQLInt) },
    product: { type: ProductType },
  }),
})

const ProductDetailImgType = new GraphQLObjectType({
  name: 'ProductDetailImg',
  description: 'This represents detail img data of product',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    coupangProductId: { type: GraphQLNonNull(GraphQLInt) },
    src: { type: GraphQLNonNull(GraphQLString) },
  }),
})

const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'This represents an order',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLID) },
    orderedAt: { type: GraphQLNonNull(GraphQLString) },
    cartProductList: {
      type: GraphQLList(CartProductType),
      resolve: productListInOrderResolver,
    },
  }),
})

const OrderProductInputType = new GraphQLInputObjectType({
  name: 'OrderProductInput',
  description: 'This represents and order product',
  fields: () => ({
    productId: { type: GraphQLNonNull(GraphQLID) },
    orderProductId: { type: GraphQLNonNull(GraphQLID) },
    quantity: { type: GraphQLNonNull(GraphQLInt) },
  })
})

const changeStatusMessageType = new GraphQLObjectType({
  name: 'changeStatusMessage',
  description: '수정/삭제 성공 여부 메시지',
  fields: () => ({
    success: { type: GraphQLNonNull(GraphQLBoolean) },
  }),
})

module.exports = {
  ProductType,
  CartProductType,
  ProductDetailImgType,
  OrderType,
  OrderProductInputType,
  changeStatusMessageType,
}
