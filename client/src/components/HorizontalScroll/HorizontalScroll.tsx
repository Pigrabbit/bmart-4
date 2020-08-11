import React from 'react'
import styled from 'styled-components'

import { ProductCard } from './ProductCard'
import { STYLES } from '../../utils/styleConstants'

export type ProductType = { price: number; name: string; thumbnail: string }

type Props = {
  title: string
  productList: ProductType[]
}

const StyledWrapper = styled.div`
  padding: ${STYLES.padding} 0;
  margin-top: 6px;
  background-color: white;
  box-shadow: ${STYLES.shadow};
`
const StyledContainer = styled.div`
  width: 100%;
  overflow-x: hidden;
`
const StyledHeader = styled.div`
  padding-left: ${STYLES.padding};
  h2 {
    margin: 0;
    line-height: 40px;
  }
`
const StyledProductList = styled.div`
  display: flex;
  overflow-x: auto;
  padding-left: ${STYLES.padding};
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`

const StyledSpacer = styled.div`
  width: 3px;
  flex: 0 0 auto;
`

export const HorizontalScroll = (props: Props) => {
  const { title, productList } = props

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledHeader>
          <h2>{title}</h2>
        </StyledHeader>
        <StyledProductList>
          {productList.map((product, idx) => {
            return <ProductCard key={idx} product={product}></ProductCard>
          })}
          <StyledSpacer></StyledSpacer>
        </StyledProductList>
      </StyledContainer>
    </StyledWrapper>
  )
}
