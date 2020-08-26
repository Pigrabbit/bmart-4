import React, { useState } from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { ProductCardType } from '../../types/productCard'
import { useMutation } from '@apollo/client'
import {
  LIKE_PRODUCT,
  DISLIKE_PRODUCT,
  LikeProductVars,
  DislikeProductData,
} from '../../apis/graphqlQuery'
import { useHistory } from 'react-router-dom'
import { ProductCardThumbnail } from './ProductCardThumbnail'

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
  const {
    id,
    price,
    name,
    thumbnailSrc,
    stockCount,
    coupangProductId,
    basePrice,
    discountRate,
  } = product

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

  return (
    <StyledContainer className="product-card" width={width} style={style}>
      <StyledLink onClick={seperateClickEventHandler}>
        <ProductCardThumbnail
          lazyLoad={lazyLoad}
          isLiked={isLiked}
          isSoldOut={stockCount === 0}
          thumbnailSrc={thumbnailSrc}
          toggleProductLike={toggleProductLike}
          seperateClickEventHandler={seperateClickEventHandler}
        />
        <StyledContent>
          <div className="product-name">{name}</div>
          <div className="price">{parseToLocalMoneyString(price)}원</div>
        </StyledContent>
      </StyledLink>
    </StyledContainer>
  )
}
