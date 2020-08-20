import { gql } from '@apollo/client'

export const GET_PRODUCTLIST_BY_CATEGORY = gql`
  query GetProductListByCategory($category: String!, $offset: Int!, $limit: Int!, $sorter: Int!) {
    productListByCategory(
      userId: 1
      category: $category
      offset: $offset
      limit: $limit
      sorter: $sorter
    ) {
      id
      price
      name
      thumbnailSrc
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
  }
}

export type ProductInCartData = {
  productListInCart: ProductInCart[]
}

export type ProductInCartVars = { userId: number }

export const GET_PRODUCTLIST_IN_CART = gql`
  query GetProductListInCart {
    productListInCart(userId: 1) {
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
      }
    }
  }
`
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
