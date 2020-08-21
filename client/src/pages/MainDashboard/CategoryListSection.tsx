import React, { useState, useRef, useCallback } from 'react'
import { CategoryList } from './CategoryList'
import { CATEGORIES, LAZY_LOAD_THRESHOLD } from '../../utils/constants'
import { CategoryListSectionHeader } from './CategoryListSectionHeader'

type Props = {}

export const CategoryListSection = (props: Props) => {
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [categoryList, setCategoryList] = useState<string[]>([CATEGORIES[0].name])
  const observer = useRef<IntersectionObserver | null>(null)
  const [selectedCategory, selectCategory] = useState<string>(CATEGORIES[0].name)

  const addCategoryListHandler = () => {
    const length = categoryList.length

    if (length >= CATEGORIES.length) {
      setHasMore(false)
      return
    }

    setCategoryList([...categoryList, CATEGORIES[length].name])
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

  const changeFocus = (category: string, flag: 'in' | 'out') => {
    if (flag === 'in' && selectedCategory !== category) {
      selectCategory(category)
    }

    if (flag === 'out') {
      const idx = CATEGORIES.findIndex((c) => c.name === category)
      if (idx > 0) selectCategory(CATEGORIES[idx - 1].name)
    }
  }

  return (
    <section className="category-list-section">
      <CategoryListSectionHeader selectedCategory={selectedCategory} />
      {categoryList.map((category, idx) => {
        return idx + 1 === categoryList.length ? (
          <div className="wrap" ref={lastCategoryListRef} key={idx}>
            <CategoryList idx={idx} category={category} changeFocus={changeFocus} />
          </div>
        ) : (
          <div className="wrap" key={idx}>
            <CategoryList idx={idx} category={category} changeFocus={changeFocus} />
          </div>
        )
      })}
    </section>
  )
}
