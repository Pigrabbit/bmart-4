import React, { useState, useEffect, useRef } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Sorter } from '../../components/Sorter'
import { useRouteMatch } from 'react-router-dom'
import { CATEGORIES, ONE_PAGE_LENGTH, PRODUCT_SORT_TYPE } from '../../utils/constants'
import { CategoryDashboardRouteProps } from '../../types/routeProps'
import { replaceSlashesWithCommas } from '../../utils/parser'
import { ProductBlock } from './ProductBlock'
import { SortType } from '../../types/sort'

type Props = {}

export const CategoryDashboard = (props: Props) => {
  const match = useRouteMatch<CategoryDashboardRouteProps>()
  const category = CATEGORIES.filter((c) => String(c.id) === match.params.categoryId)[0]

  const currentPage = useRef<number>(1)
  const noMoreProducts = useRef<boolean>(false)
  const [pageList, setPageList] = useState<number[]>([0])
  const [sorter, setSorter] = useState<SortType>('')

  const endOfScreenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!noMoreProducts.current) {
            setPageList((pageList) => [...pageList, currentPage.current])
            currentPage.current += 1
          }
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    )
    if (endOfScreenRef && endOfScreenRef.current) {
      observer.observe(endOfScreenRef.current)
    }
  }, [endOfScreenRef])

  const sorterChangeHandler = (sorter: SortType) => {
    setPageList([0])
    setSorter(sorter)
  }

  return (
    <div>
      <Header title={`${replaceSlashesWithCommas(category.name)}`} />
      <Sorter
        selectedSorter={sorter}
        sorterList={PRODUCT_SORT_TYPE}
        sorterChangeHandler={sorterChangeHandler}
      />
      {pageList.map((el, idx) => {
        return (
          <ProductBlock
            page={el}
            key={idx}
            onePageLength={ONE_PAGE_LENGTH}
            sorter={sorter}
            categoryName={category.name}
            noMoreProducts={noMoreProducts}
          />
        )
      })}
      {noMoreProducts.current ? (
        <div>없음</div>
      ) : (
        <div className="endOfScreen" ref={endOfScreenRef}></div>
      )}
      <Footer />
    </div>
  )
}
