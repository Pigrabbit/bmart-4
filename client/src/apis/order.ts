import { ProductInCart } from './cart'
import { SuccessData } from './product'
import { gql } from '@apollo/client'

export type OrderProductInputType = {
  productId: string
  orderProductId: string
  quantity: number
}

export type CheckoutOrderVars = {
  orderProductList: OrderProductInputType[]
}

export type CheckoutOrderData = {
  checkoutOrder: SuccessData
}

export const CHECKOUT_ORDER = gql`
  mutation CheckoutOrder($orderProductList: [OrderProductInput]!) {
    checkoutOrder(orderProductList: $orderProductList) {
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
