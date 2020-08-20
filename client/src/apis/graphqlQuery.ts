import { gql } from '@apollo/client'

export const GET_PRODUCTLIST_BY_CATEGORY = gql`
  query GetProductListByCategory($userId: ID!, $category: String!, $offset: Int!, $limit: Int!) {
    productListByCategory(userId: $userId, category: $category, offset: $offset, limit: $limit) {
      id
      price
      name
      thumbnailSrc
    }
  }
`
