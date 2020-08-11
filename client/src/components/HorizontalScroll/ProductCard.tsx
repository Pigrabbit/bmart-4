import React from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { ProductType } from './HorizontalScroll'
import { STYLES } from '../../utils/styleConstants'

type Props = {
  product: ProductType
}

const StyledContainer = styled.div`
  width: 120px;
  flex: 0 0 auto;
  margin-right: ${STYLES.margin};
`
const StyledThumbnail = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`
const StyledContent = styled.div`
  line-height: 20px;
  .price {
    font-weight: 700;
  }
`

export const ProductCard = (props: Props) => {
  const { price, name, thumbnail } = props.product

  return (
    <StyledContainer>
      <StyledThumbnail>
        <img src={thumbnail} alt="" />
      </StyledThumbnail>
      <StyledContent>
        <div>{name}</div>
        <div className="price">{parseToLocalMoneyString(price)}원</div>
      </StyledContent>
    </StyledContainer>
  )
}
