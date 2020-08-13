import React, { useState, useRef, useCallback } from 'react'
import { CategoryList } from './CategoryList'
import { CATEGORIES, LAZY_LOAD_THRESHOLD } from '../../utils/constants'
import styled from 'styled-components'

type Props = {}

const StyledHader = styled.div`
  position: sticky;
`

export const CategoryListSection = (props: Props) => {
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [categoryList, setCategoryList] = useState<string[]>([CATEGORIES[0]])
  const observer = useRef<IntersectionObserver | null>(null)

  const addCategoryListHandler = () => {
    const length = categoryList.length

    if (length >= CATEGORIES.length) {
      setHasMore(false)
      return
    }
    console.log(categoryList, [...categoryList, CATEGORIES[length]])
    setCategoryList([...categoryList, CATEGORIES[length]])
  }

  const lastCategoryListRef = useCallback(
    (el) => {
      if (hasMore && observer.current) observer.current.disconnect()

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            addCategoryListHandler()
          }
        },
        { threshold: LAZY_LOAD_THRESHOLD }
      )
      if (el) observer.current.observe(el)
    },
    [hasMore, categoryList]
  )

  return (
    <section className="category-list-section">
      <StyledHader>HEADER</StyledHader>
      {categoryList.map((category, idx) => {
        return idx + 1 === categoryList.length ? (
          <CategoryList key={idx} ref={lastCategoryListRef} category={category} />
        ) : (
          <CategoryList key={idx} category={category} />
          )
      })}
    </section>
  )
}
