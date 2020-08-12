import React from 'react'
import styled from 'styled-components'
import { ProductCard } from '../ProductCard'
import { ProductCardType } from '../../types/productCard'

type Props = {
  productList: ProductCardType[]
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
      {productList.map((product, idx) => (
        <ProductCard key={idx} product={product} width="36%" style={{ marginRight: '10px' }} />
      ))}
      <StyledSpacer></StyledSpacer>
    </StyledProductList>
  )
}
