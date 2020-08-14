import React, { forwardRef } from 'react'
import { StyledWrapper } from '../../styles/StyledWrapper'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { VerticalList } from '../../components/VerticalList'

type Props = {
  category: string
}

export const CategoryList = forwardRef((props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { category } = props

  const { loading, error, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {
    variables: { category, offset: 10, limit: 10 },
  })
  if (loading) return <p>Loading...</p>
  const { productListByCategory } = data

  return (
    <div className="wrap" ref={ref}>
      <VerticalList title={category} productList={productListByCategory} />
    </div>
  )
})
