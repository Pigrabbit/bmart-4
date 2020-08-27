import React from 'react'
import styled from 'styled-components'
import { ProductCardType } from '../../types/productCard'
import { ProductCard } from '../ProductCard'
import { SkeletonCard } from '../SkeletonCard'
import { SKELETON_CARD_COUNT } from '../../utils/constants'

type Props = {
  loading: boolean
  lazyLoad?: boolean
  productList: ProductCardType[]
}

const StyledProductList = styled.div`
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  -webkit-overflow-scrolling: touch;
`

export const ProductCardList = (props: Props) => {
  const { productList, lazyLoad, loading } = props

  return (
    <StyledProductList className="product-list">
      {loading
        ? Array(SKELETON_CARD_COUNT)
            .fill('')
            .map((_, idx) => (
              <SkeletonCard key={idx} width="calc(50% - 5px)" style={{ marginBottom: '10px' }} />
            ))
        : productList.map((product, idx) => (
            <ProductCard
              key={idx}
              product={product}
              lazyLoad={lazyLoad}
              width="calc(50% - 5px)"
              style={{ marginBottom: '10px' }}
            />
          ))}
    </StyledProductList>
  )
}
