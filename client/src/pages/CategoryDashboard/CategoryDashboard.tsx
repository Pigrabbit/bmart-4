import React, { useState, useEffect, useRef } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { Sorter } from '../../components/Sorter'
import { RouteComponentProps } from 'react-router-dom'
import { CATEGORIES } from '../../utils/constants'
import { CategoryDashboardRouteProps } from '../../types/routeProps'
import { replaceSlashesWithCommas } from '../../utils/parser'
import { ProductBlock } from './ProductBlock'

type Props = {} & RouteComponentProps<CategoryDashboardRouteProps>

export const CategoryDashboard = (props: Props) => {
  const { match } = props
  const category = CATEGORIES.filter((c) => String(c.id) === match.params.categoryId)[0]

  const [pageList, setPageList] = useState<number[]>([0])
  const [sorter, setSorter] = useState('sellCountDesc')
  const sorterChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSorter(event.target.value)
  }

  let page = 1
  let onePageLength = 10

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPageList((pageList) => [...pageList, ++page])
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    )
    if (ref.current) {
      observer.observe(ref.current!)
    }
  }, [ref])

  return (
    <div>
      <Header title={`${replaceSlashesWithCommas(category.name)}`} />
      <Sorter sorterChangeHandler={sorterChangeHandler} />
      <div>current sorter is {sorter}</div>
      {pageList.map((el, idx) => {
        return (
          <ProductBlock
            page={el}
            key={idx}
            onePageLength={onePageLength}
            sorter={sorter}
            categoryName={category.name}
          />
        )
      })}
      <div className="endOfScreen" ref={ref}></div>
      <Footer />
    </div>
  )
}
