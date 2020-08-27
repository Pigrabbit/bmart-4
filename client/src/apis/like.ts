import { gql } from '@apollo/client'
import { ProductByCategory, SuccessData } from './product'

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
