import React from 'react'
import { ProductCardType } from '../../types/productCard'
import { StyledWrapper } from '../../styles/StyledWrapper'
import { STYLES } from '../../utils/styleConstants'
import styled from 'styled-components'
import { ProductCard } from '../ProductCard'

type Props = {
  title: string
  productList: ProductCardType[]
}

const StyledContainer = styled.div`
  padding: ${STYLES.padding};
  width: 100%;
`
const StyledHeader = styled.div`
  h2 {
    margin: 0;
    line-height: 30px;
  }
`
const StyledProductListWrap = styled.div`
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  -webkit-overflow-scrolling: touch;
`

export const VerticalList = (props: Props) => {
  const { title, productList } = props

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledHeader>
          <h2>{title}</h2>
        </StyledHeader>
        <StyledProductListWrap>
          {productList.map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              width="calc(50% - 5px)"
              style={{ marginBottom: '10px' }}
            />
          ))}
        </StyledProductListWrap>
      </StyledContainer>
    </StyledWrapper>
  )
}
