import React from 'react'
import styled from 'styled-components'
import { ProductCardList } from './ProductCardList'
import { STYLES } from '../../utils/styleConstants'
import { StyledWrapper } from '../../styles/StyledWrapper'
import { ProductCardType } from '../../types/productCard'

export type Props = {
  title: string
  productList: ProductCardType[]
  double?: boolean
  loading?: boolean
}

const StyledContainer = styled.div`
  padding: 12px 0;
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
  const { productList, double = false, loading = false } = props

  let { title } = props

  const renderProductCardList = () => {
    const length = productList.length
    const half = Math.ceil(length / 2)

    return double ? (
      <>
        <ProductCardList loading={loading} productList={[...productList.slice(0, half)]} />
        <ProductCardList loading={loading} productList={[...productList.slice(half, length)]} />
      </>
    ) : (
      <ProductCardList loading={loading} productList={productList} />
    )
  }

  const firstname: string | null = localStorage.getItem('firstname')
  if (firstname) {
    title = title.replace('회원', firstname)
  }

  return (
    <StyledWrapper className="horizontal-product-list">
      <StyledContainer>
        <StyledHeader>
          <h2 className="title">{title}</h2>
        </StyledHeader>
        <StyledProductListWrap>{renderProductCardList()}</StyledProductListWrap>
      </StyledContainer>
    </StyledWrapper>
  )
}
