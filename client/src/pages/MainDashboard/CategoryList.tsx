import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  GET_PRODUCTLIST_BY_CATEGORY,
  ProductByCategoryData,
  ProductByCategoryVars,
} from '../../apis/graphqlQuery'
import { VerticalList } from '../../components/VerticalList'
import styled from 'styled-components'

type Props = {
  idx: number
  category: string
  lazyLoad: boolean
  changeFocus: (category: string, flag: 'in' | 'out') => void
}
const StyledDetector = styled.div`
  width: 100%;
  height: 1px;
  background-color: white;
`

export const CategoryList = (props: Props) => {
  const { category, idx, lazyLoad } = props
  const observer = useRef<IntersectionObserver | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [imageLazyLoaded, setImageLazyLoaded] = useState<boolean>(false)

  let previousY = 0
  let previousRatio = 0

  useEffect(() => {
    if (lazyLoad && !imageLazyLoaded) {
      console.log(category)
      setImageLazyLoaded(true)
    }
  }, [lazyLoad])

  const categoryListRef = useCallback(
    (el: HTMLDivElement) => {
      observer.current = new IntersectionObserver(observeHandler, {
        root: rootRef.current,
        rootMargin: '-100px 0px 0px 0px',
        threshold: 1,
      })
      if (el) observer.current.observe(el)
    },
    [category]
  )

  const observeHandler = ([entry]: IntersectionObserverEntry[]) => {
    const currentY = entry.boundingClientRect.y
    const isIntersecting = entry.isIntersecting
    const currentRatio = entry.intersectionRatio

    if (currentY < previousY) {
      if (currentRatio > previousRatio && isIntersecting) {
      } else {
        props.changeFocus(category, 'in')
      }
    } else if (currentY > previousY && isIntersecting) {
      if (currentRatio < previousRatio) {
      } else {
        props.changeFocus(category, 'out')
      }
    }

    previousY = currentY
    previousRatio = currentRatio
  }

  const { loading, data } = useQuery<ProductByCategoryData, ProductByCategoryVars>(
    GET_PRODUCTLIST_BY_CATEGORY,
    {
      variables: { category, offset: 10, limit: 10, sorter: 'priceCountDesc' },
    }
  )

  return loading || !data ? (
    <div>Loading...</div>
  ) : (
    <div id={`category-${idx}`} ref={rootRef}>
      <StyledDetector ref={categoryListRef}></StyledDetector>
      <VerticalList
        title={category}
        lazyLoad={imageLazyLoaded}
        productList={data.productListByCategory}
      />
    </div>
  )
}
