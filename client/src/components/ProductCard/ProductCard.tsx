import React from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { STYLES } from '../../utils/styleConstants'
import { ProductCardType } from '../../types/productCard'

type Props = {
  product: ProductCardType
  width?: string
}

type StyledContainerProp = { width: string }

const StyledContainer = styled.div<StyledContainerProp>`
  width: ${(props) => props.width};
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
  const { product, width = '50%' } = props
  const { price, name, thumbnail } = product

  return (
    <StyledContainer width={width}>
      <>
        <StyledThumbnail>
          <img src={thumbnail} alt="" />
        </StyledThumbnail>
        <StyledContent>
          <div>{name}</div>
          <div className="price">{parseToLocalMoneyString(price)}원</div>
        </StyledContent>
      </>
    </StyledContainer>
  )
}
