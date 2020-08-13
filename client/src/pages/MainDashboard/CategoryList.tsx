import React, { forwardRef } from 'react'
import { StyledWrapper } from '../../styles/StyledWrapper'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { VerticalList } from '../../components/VerticalList'

type Props = {
  category: string
}

export const CategoryList = forwardRef((props: Props) => {
  const { category } = props

  const { loading, error, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {
    variables: { category, offset: 10, limit: 10 },
  })
  if (loading) return <p>Loading...</p>
  const { productListByCategory } = data

  return <VerticalList title={category} productList={productListByCategory} />
})
