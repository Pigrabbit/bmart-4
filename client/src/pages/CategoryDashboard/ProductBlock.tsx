import React, { useRef, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { VerticalList } from '../../components/VerticalList'

type Props = {
  page: number
  onePageLength: number
  sorter: string
  categoryName: string
}
export const ProductBlock = (props: Props) => {
  const { page, onePageLength, sorter, categoryName } = props
  const { loading, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {
    variables: {
      category: categoryName,
      offset: page * onePageLength,
      limit: onePageLength,
      sorter: sorter,
    },
  })
  if (loading) return <div>Loading...</div>
  const { productListByCategory } = data
  return <VerticalList title="" productList={productListByCategory} />
}
