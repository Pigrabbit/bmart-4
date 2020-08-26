import React, { useState } from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { ProductCardType } from '../../types/productCard'
import { COLORS } from '../../utils/styleConstants'
import { useMutation } from '@apollo/client'
import {
  LIKE_PRODUCT,
  DISLIKE_PRODUCT,
  LikeProductVars,
  DislikeProductData,
} from '../../apis/graphqlQuery'
import { useHistory } from 'react-router-dom'

export type Props = {
  width?: string
  lazyLoad?: boolean
  product: ProductCardType
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

  .thumbnail-wrap {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    filter: brightness(0.96);
    overflow: hidden;

    &.alt::before {
      content: '';
      display: block;
      padding: 50%;
      background-color: #fafafa;
    }

    .thumbnail {
      width: 100%;
      height: 100%;
    }
  }
`
const StyledContent = styled.div`
  line-height: 20px;
  margin-top: 4px;

  .price {
    font-weight: 700;
  }
`

const StyledLink = styled.a`
  color: inherit;
  display: block;
  text-decoration: none;
`

export const ProductCard = (props: Props) => {
  const history = useHistory()
  let interval: any = null

  const { product, width = '50%', style, lazyLoad } = props
  const { id, price, name, thumbnailSrc, coupangProductId, basePrice, discountRate } = product

  const [isLiked, setIsLiked] = useState(props.product.isLiked)

  const [likeProduct] = useMutation<{}, LikeProductVars>(LIKE_PRODUCT)
  const [dislikeProduct] = useMutation<DislikeProductData, LikeProductVars>(DISLIKE_PRODUCT)

  const toggleProductLike = async (e: React.MouseEvent) => {
    e.stopPropagation()

    const params = { variables: { productId: id } }
    if (isLiked) {
      await dislikeProduct(params)
    } else {
      await likeProduct(params)
    }

    setIsLiked(!isLiked)
  }

  const seperateClickEventHandler = (e: React.MouseEvent) => {
    e.preventDefault()

    if (interval) {
      toggleProductLike(e)
      clearTimeout(interval)
      return
    }

    interval = setTimeout(() => {
      history.push(`/product/${id}`, { ...product })
      interval = null
    }, 200)
  }

  const renderThumbnail = () => {
    if (lazyLoad === undefined) {
      return (
        <div className="thumbnail-wrap">
          <img className="thumbnail" src={thumbnailSrc} alt="" />
        </div>
      )
    } else {
      if (!lazyLoad) {
        return (
          <div className="thumbnail-wrap alt">
            <img className="thumbnail" src={''} data-lazy={thumbnailSrc} alt="" />
          </div>
        )
      } else {
        return (
          <div className="thumbnail-wrap">
            <img className="thumbnail" src={thumbnailSrc} data-lazy={thumbnailSrc} alt="" />
          </div>
        )
      }
    }
  }

  return (
    <StyledContainer className="product-card" width={width} style={style}>
      <StyledLink onClick={seperateClickEventHandler}>
        <StyledThumbnail onDoubleClick={seperateClickEventHandler}>
          <div className="icon-wrap" onClick={toggleProductLike}>
            {isLiked ? (
              <i className="icon like">heart_circle</i>
            ) : (
              <i className="icon">heart_circle_fill</i>
            )}
          </div>
          {renderThumbnail()}
        </StyledThumbnail>
        <StyledContent>
          <div className="product-name">{name}</div>
          <div className="price">{parseToLocalMoneyString(price)}원</div>
        </StyledContent>
      </StyledLink>
    </StyledContainer>
  )
}
