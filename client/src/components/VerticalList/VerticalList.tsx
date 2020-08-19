import React from 'react'
import { ProductCardType } from '../../types/productCard'
import { StyledWrapper } from '../../styles/StyledWrapper'
import { STYLES } from '../../utils/styleConstants'
import styled from 'styled-components'
import { ProductCardList } from './ProductCardList'

export type Props = {
  title: string
  productList: ProductCardType[]
  sorter: number // vertical list의 항목을 어떻게 정렬할 것인가?
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

export const VerticalList = (props: Props) => {
  const { title, productList, sorter } = props

  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledHeader>
          <h2 className="title">{title}</h2>
        </StyledHeader>
        <ProductCardList productList={productList} />
      </StyledContainer>
    </StyledWrapper>
  )
}
