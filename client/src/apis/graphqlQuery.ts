import { gql } from '@apollo/client'

export type ProductByCategory = {
  id: string
  name: string
  price: number
  basePrice: number
  discountRate: number
  thumbnailSrc: string
  coupangProductId: string
  isLiked: boolean
  stockCount: number
}

export type ProductByCategoryData = {
  productListByCategory: ProductByCategory[]
}

export type ProductByCategoryVars = {
  category: string
  offset: number
  limit: number
  sorter: string
}

export const GET_PRODUCTLIST_BY_CATEGORY = gql`
  query GetProductListByCategory(
    $category: String!
    $offset: Int!
    $limit: Int!
    $sorter: String!
  ) {
    productListByCategory(category: $category, offset: $offset, limit: $limit, sorter: $sorter) {
      id
      price
      basePrice
      discountRate
      name
      thumbnailSrc
      coupangProductId
      isLiked
      stockCount
    }
  }
`

export type ProductByIdVars = {
  id: string
}

export type ProductByIdData = {
  productById: ProductByCategory
}

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: ID!) {
    productById(id: $id) {
      name
      price
      isLiked
      stockCount
    }
  }
`

export type LikedProductListVars = {
  offset: number
  limit: number
}

export type LikedProductListData = {
  likedProductList: ProductByCategory[]
}

export const GET_LIKED_PRODUCTLIST = gql`
  query GetLikedProductList($offset: Int!, $limit: Int!) {
    likedProductList(offset: $offset, limit: $limit) {
      id
      price
      basePrice
      discountRate
      name
      thumbnailSrc
      coupangProductId
      isLiked
      stockCount
    }
  }
`

export type ProductDetailImg = {
  id: string
  src: string
  coupangProductId: string
}

export type ProductDetailImgData = {
  productDetailImgList: ProductDetailImg[]
}

export type ProductDetailImgVars = {
  id: string
}

export const GET_PRODUCT_DETAIL_IMG_SRC_LIST = gql`
  query GetProductDetailImg($id: ID!) {
    productDetailImgList(id: $id) {
      id
      coupangProductId
      src
    }
  }
`

export type ProductInCart = {
  id: string
  quantity: number
  priceSum: number
  product: {
    id: string
    name: string
    price: number
    basePrice: number
    discountRate: number
    thumbnailSrc: string
    stockCount: number
  }
}

export type ProductInCartData = {
  productListInCart: ProductInCart[]
}

export type ProductInCartVars = {}

export const GET_PRODUCTLIST_IN_CART = gql`
  query GetProductListInCart {
    productListInCart {
      id
      quantity
      priceSum
      product {
        id
        name
        price
        basePrice
        discountRate
        thumbnailSrc
        coupangProductId
        stockCount
      }
    }
  }
`

export type GetProuctCountInCartData = {
  productCountInCart: number
}

export const GET_PRODUCT_COUNT_IN_CART = gql`
  query ProductCountInCart {
    productCountInCart
  }
`

type SuccessData = {
  success: boolean
}

export type ModifyProductQuantityData = {
  modifyProductQuantity: SuccessData
}

export type ModifyProductQuantityVars = {
  productId: string
  orderProductId: string
  quantity: number
}

export const MODIFY_PRODUCT_QUANTITY = gql`
  mutation ModifyProductQuantity($productId: ID!, $orderProductId: ID!, $quantity: Int!) {
    modifyProductQuantity(
      productId: $productId
      orderProductId: $orderProductId
      quantity: $quantity
    ) {
      success
    }
  }
`

export type DeleteProductFromCartData = {
  deleteProductFromCart: SuccessData
}

export type DeleteProductFromCartVars = {
  orderProductIds: string[]
}

export const DELETE_PRODUCT_FROM_CART = gql`
  mutation DeleteProductFromCart($orderProductIds: [ID]!) {
    deleteProductFromCart(orderProductIds: $orderProductIds) {
      success
    }
  }
`

export type AddProductToCartVars = {
  productId: string
  quantity: number
}

export const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToCart($productId: ID!, $quantity: Int!) {
    addProductToCart(productId: $productId, quantity: $quantity)
  }
`

export type LikeProductVars = {
  productId: string
}

export type DislikeProductData = {
  dislikeProduct: SuccessData
}

export const LIKE_PRODUCT = gql`
  mutation LikeProduct($productId: ID!) {
    likeProduct(productId: $productId)
  }
`

export const DISLIKE_PRODUCT = gql`
  mutation DislikeProduct($productId: ID!) {
    dislikeProduct(productId: $productId) {
      success
    }
  }
`

export type CheckoutOrderData = {
  checkoutOrder: SuccessData
}

export const CHECKOUT_ORDER = gql`
  mutation CheckoutOrder {
    checkoutOrder {
      success
    }
  }
`

export type OrderHistory = {
  id: string
  orderedAt: string
  cartProductList: ProductInCart[]
}

export type OrderHistoryData = {
  orderHistoryList: OrderHistory[]
}

export const GET_ORDER_HISTORY = gql`
  query GetOrderHistory {
    orderHistoryList {
      id
      orderedAt
      cartProductList {
        id
        quantity
        priceSum
        product {
          id
          name
          price
          basePrice
          discountRate
          thumbnailSrc
          coupangProductId
        }
      }
    }
  }
`
