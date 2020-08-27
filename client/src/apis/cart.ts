import { gql } from '@apollo/client'

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
  productIdsInCart: string[]
}

export const GET_PRODUCT_IDS_IN_CART = gql`
  query ProductIdsInCart {
    productIdsInCart
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
