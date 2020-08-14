import React, { useState, useRef, useCallback } from 'react'
import { CategoryList } from './CategoryList'
import { CATEGORIES, LAZY_LOAD_THRESHOLD } from '../../utils/constants'
import { CategoryListSectionHeader } from './CategoryListSectionHeader'

type Props = {}

export const CategoryListSection = (props: Props) => {
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [categoryList, setCategoryList] = useState<string[]>([CATEGORIES[0]])
  const lastCategoryListObserver = useRef<IntersectionObserver | null>(null)

  const addCategoryListHandler = () => {
    const length = categoryList.length

    if (length >= CATEGORIES.length) {
      setHasMore(false)
      return
    }

    setCategoryList([...categoryList, CATEGORIES[length]])
  }

  const lastCategoryListRef = useCallback(
    (el) => {
      if (hasMore && lastCategoryListObserver.current) lastCategoryListObserver.current.disconnect()

      if (lastCategoryListObserver.current) lastCategoryListObserver.current.disconnect()

      lastCategoryListObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            addCategoryListHandler()
          }
        },
        { threshold: LAZY_LOAD_THRESHOLD }
      )
      if (el) lastCategoryListObserver.current.observe(el)
    },
    [hasMore, categoryList]
  )

  return (
    <section className="category-list-section">
      <CategoryListSectionHeader selectedCategory={CATEGORIES[0]} />
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
