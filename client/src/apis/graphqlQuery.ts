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
