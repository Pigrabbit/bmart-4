import React from 'react'
import styled from 'styled-components'
import { ProductCardList } from './ProductCardList'
import { STYLES } from '../../utils/styleConstants'
import { StyledWrapper } from '../../styles/StyledWrapper'
import { ProductCardType } from '../../types/productCard'

type Props = {
  title: string
  productList: ProductCardType[]
  double?: boolean
}

const StyledContainer = styled.div`
  padding: ${STYLES.padding} 0;
  width: 100%;
  overflow-x: hidden;
`
const StyledHeader = styled.div`
  padding-left: ${STYLES.padding};
  h2 {
    margin: 0;
    line-height: 30px;
  }
`
const StyledProductListWrap = styled.div`
  overflow-x: auto;
  padding-left: ${STYLES.padding};
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`

export const HorizontalList = (props: Props) => {
  const { title, productList, double = false } = props

  const renderProductCardList = () => {
    const length = productList.length
    const half = Math.ceil(length / 2)

    return double ? (
      <>
        <ProductCardList productList={[...productList.slice(0, half)]}></ProductCardList>
        <ProductCardList productList={[...productList.slice(half, length)]}></ProductCardList>
      </>
    ) : (
      <ProductCardList productList={productList}></ProductCardList>
    )
  }

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledHeader>
          <h2>{title}</h2>
        </StyledHeader>
        <StyledProductListWrap>{renderProductCardList()}</StyledProductListWrap>
      </StyledContainer>
    </StyledWrapper>
  )
}
