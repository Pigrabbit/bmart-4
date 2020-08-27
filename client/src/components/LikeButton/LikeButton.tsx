import React, { useState } from 'react'
import {
  LIKE_PRODUCT,
  DISLIKE_PRODUCT,
  LikeProductVars,
  DislikeProductData,
} from '../../apis/graphqlQuery'
import { useMutation } from '@apollo/client'
import styled from 'styled-components'
import { COLORS } from '../../utils/styleConstants'
const StyledLikedButton = styled.div`
  .icon {
    color: #eee;
    border-radius: 50%;
    &.like {
      color: ${COLORS.red};
    }
  }
`

type Props = {
  isLiked: boolean
  productId: string
}

export const LikeButton = (props: Props) => {
  const [isLiked, setIsLiked] = useState(props.isLiked)
  const [likeProduct] = useMutation<{}, LikeProductVars>(LIKE_PRODUCT)
  const [dislikeProduct] = useMutation<DislikeProductData, LikeProductVars>(DISLIKE_PRODUCT)
  const toggleProductLike = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const params = { variables: { productId: props.productId } }
    console.log(params)
    if (isLiked) {
      await dislikeProduct(params)
    } else {
      await likeProduct(params)
    }
    setIsLiked(!isLiked)
  }
  return (
    <StyledLikedButton className="icon-wrap" onClick={toggleProductLike}>
      {isLiked ? (
        <i className="icon like">heart_circle_fill</i>
      ) : (
        <i className="icon">heart_circle_fill</i>
      )}
    </StyledLikedButton>
  )
}
