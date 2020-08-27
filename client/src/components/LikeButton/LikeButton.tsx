import React, { useState } from 'react'
import {
  LIKE_PRODUCT,
  DISLIKE_PRODUCT,
  LikeProductVars,
  DislikeProductData,
} from '../../apis/graphqlQuery'
import { useMutation } from '@apollo/client'

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
    if (isLiked) {
      await dislikeProduct(params)
    } else {
      await likeProduct(params)
    }
    setIsLiked(!isLiked)
  }
  return (
    <div className="icon-wrap" onClick={toggleProductLike}>
      {isLiked ? (
        <i className="icon like">heart_circle_fill</i>
      ) : (
        <i className="icon">heart_circle_fill</i>
      )}
    </div>
  )
}
