import React from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { ProductCardType } from '../../types/productCard'
import { StyledLink } from '../../styles/StyledLink'

type Props = {
  product: ProductCardType
  width?: string
  style?: React.CSSProperties
}

type StyledContainerProp = { width: string }

const StyledContainer = styled.div<StyledContainerProp>`
  width: ${(props) => props.width};
  flex: 0 0 auto;
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
  const { product, width = '50%', style } = props
  const { id, price, name, thumbnailSrc } = product

  return (
    <StyledContainer className="product-card" width={width} style={style}>
      <StyledLink to={`/product/${id}`}>
        <StyledThumbnail>
          <img className="thumbnail" src={`http://${thumbnailSrc}`} alt="" />
        </StyledThumbnail>
        <StyledContent>
          <div className="product-name">{name}</div>
          <div className="price">{parseToLocalMoneyString(price)}원</div>
        </StyledContent>
      </StyledLink>
    </StyledContainer>
  )
}
