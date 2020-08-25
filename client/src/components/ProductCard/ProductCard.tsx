import React, { useState } from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { ProductCardType } from '../../types/productCard'
import { StyledLink } from '../../styles/StyledLink'
import { COLORS } from '../../utils/styleConstants'
import { useMutation } from '@apollo/client'
import {
  LIKE_PRODUCT,
  DISLIKE_PRODUCT,
  LikeProductVars,
  DislikeProductData,
} from '../../apis/graphqlQuery'

export type Props = {
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
  position: relative;
  font-size: 0;

  .icon-wrap {
    font-size: 24px;
    line-height: 24px;
    width: 24px;
    height: 24px;
    position: absolute;
    right: 4px;
    bottom: 4px;
    z-index: 10;

    .icon {
      color: #eee;
      border-radius: 50%;

      &.like {
        color: ${COLORS.red};
      }
    }
  }

  .thumbnail {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    filter: brightness(0.96);
  }
`
const StyledContent = styled.div`
  line-height: 20px;
  margin-top: 4px;

  .price {
    font-weight: 700;
  }
`

export const ProductCard = (props: Props) => {
  const { product, width = '50%', style } = props
  const { id, price, name, thumbnailSrc, coupangProductId, basePrice, discountRate } = product

  const [isLiked, setIsLiked] = useState(props.product.isLiked)

  const [likeProduct] = useMutation<{}, LikeProductVars>(LIKE_PRODUCT)
  const [dislikeProduct] = useMutation<DislikeProductData, LikeProductVars>(DISLIKE_PRODUCT)

  const toggleProductLike = async (e: React.MouseEvent) => {
    e.preventDefault()

    const params = { variables: { productId: id } }
    if (isLiked) {
      await dislikeProduct(params)
    } else {
      await likeProduct(params)
    }

    setIsLiked(!isLiked)
  }

  return (
    <StyledContainer className="product-card" width={width} style={style}>
      <StyledLink
        to={{
          pathname: `/product/${id}`,
          state: {
            ...product,
          },
        }}
      >
        <StyledThumbnail>
          <div className="icon-wrap" onClick={toggleProductLike}>
            {isLiked ? (
              <i className="icon like">heart_circle</i>
            ) : (
              <i className="icon">heart_circle_fill</i>
            )}
          </div>
          <img className="thumbnail" src={thumbnailSrc} alt="" />
        </StyledThumbnail>
        <StyledContent>
          <div className="product-name">{name}</div>
          <div className="price">{parseToLocalMoneyString(price)}원</div>
        </StyledContent>
      </StyledLink>
    </StyledContainer>
  )
}
