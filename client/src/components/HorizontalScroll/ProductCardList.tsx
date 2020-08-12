import React from 'react'
import styled from 'styled-components'
import { ProductCard } from './ProductCard'

import { ProductType } from './HorizontalScroll'

type Props = {
  productList: ProductType[]
}

const StyledProductList = styled.div`
  display: flex;
  margin-top: 10px;
`

const StyledSpacer = styled.div`
  width: 3px;
  flex: 0 0 auto;
`

export const ProductCardList = (props: Props) => {
  const { productList } = props

  return (
    <StyledProductList>
      {productList.map((product, idx) => {
        return <ProductCard key={idx} product={product}></ProductCard>
      })}
      <StyledSpacer></StyledSpacer>
    </StyledProductList>
  )
}
