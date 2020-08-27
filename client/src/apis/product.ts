import { gql } from '@apollo/client'

export type SuccessData = {
  success: boolean
}

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

export type ProductByDiscountRateVars = {
  offset?: number
  limit?: number
}

export type ProductByDiscoutRateData = {
  productListByDiscountRate: ProductByCategory[]
}

export const GET_PRODUCT_BY_DISCOUNT_RATE = gql`
  query GetProductByDiscountRate($offset: Int, $limit: Int) {
    productListByDiscountRate(offset: $offset, limit: $limit) {
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
