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
