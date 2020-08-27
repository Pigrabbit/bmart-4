import React, { useRef, useCallback, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import {
  GET_PRODUCTLIST_BY_CATEGORY,
  ProductByCategoryData,
  ProductByCategoryVars,
} from '../../apis/product'
import { VerticalList } from '../../components/VerticalList'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'

type Props = {
  idx: number
  category: string
  categoryId: number
  lazyLoad: boolean
  changeFocus: (category: string, flag: 'in' | 'out') => void
}
const StyledDetector = styled.div`
  width: 100%;
  height: 1px;
  background-color: white;
`

const StyledMoreLinkRow = styled.div`
  margin: 0 0 5px 0;
  padding: 10px 0 10px 0;
  font-size: 1.2em;
  text-decoration: none;
  background: white;
  height: 50px;
`

const StyledMoreLink = styled.a`
  position: absolute;
  right: ${STYLES.padding};
  &:link {
    color: black;
    text-decoration: none;
  }
  &:visited {
    color: black;
    text-decoration: none;
  }
`

export const CategoryList = (props: Props) => {
  const { category, idx, lazyLoad, categoryId } = props
  const observer = useRef<IntersectionObserver | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [imageLazyLoaded, setImageLazyLoaded] = useState<boolean>(false)

  let previousY = 0
  let previousRatio = 0

  useEffect(() => {
    if (lazyLoad && !imageLazyLoaded) {
      setImageLazyLoaded(true)
    }
  }, [lazyLoad])

  const categoryListRef = useCallback(
    (el: HTMLDivElement) => {
      observer.current = new IntersectionObserver(observeHandler, {
        root: rootRef.current,
        rootMargin: '-150px 0px 0px 0px',
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
    if (currentY < 0) return

    if (currentY < previousY) {
      if (currentRatio > previousRatio && isIntersecting) {
        props.changeFocus(category, 'out')
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

  const { loading, data, refetch } = useQuery<ProductByCategoryData, ProductByCategoryVars>(
    GET_PRODUCTLIST_BY_CATEGORY,
    {
      variables: { category, offset: 10, limit: 10, sorter: 'priceCountDesc' },
    }
  )

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div id={`category-${idx}`} ref={rootRef}>
      <StyledDetector ref={categoryListRef}></StyledDetector>
      <VerticalList
        title={category}
        lazyLoad={imageLazyLoaded}
        loading={loading && !data?.productListByCategory}
        productList={data?.productListByCategory || []}
      />
      <StyledMoreLinkRow>
        <StyledMoreLink href={`/category/${categoryId}`}>
          {category} 더보기 <i className="icon">chevron_right</i>
        </StyledMoreLink>
      </StyledMoreLinkRow>
    </div>
  )
}
