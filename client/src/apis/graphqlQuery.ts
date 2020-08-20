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
      basePrice
      discountRate
      name
      thumbnailSrc
      coupangProductId
    }
  }
`

export const GET_PRODUCT_DETAIL_IMG_SRC_LIST = gql`
  query GetProductDetailImg($coupangProductId: Int!) {
    productDetailImgList(coupangProductId: $coupangProductId) {
      id
      coupangProductId
      src
    }
  }
`

export const ADD_PRODUCT_TO_CART = gql`
  mutation AddProductToCart($productId: ID!, $quantity: Int!) {
    addProductToCart(userId: 1, productId: $productId, quantity: $quantity)
  }
`
