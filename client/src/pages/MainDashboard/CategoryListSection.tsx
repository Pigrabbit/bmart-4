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
        if (idx + 1 === categoryList.length) {
          return (
            <div className="list-wrap" key={idx} ref={lastCategoryListRef}>
              <CategoryList category={category}></CategoryList>
            </div>
          )
        } else {
          return (
            <div className="list-wrap" key={idx} ref={lastCategoryListRef}>
              <CategoryList category={category}></CategoryList>
            </div>
          )
        }
      })}
    </section>
  )
}
