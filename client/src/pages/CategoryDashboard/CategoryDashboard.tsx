import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { useQuery, useLazyQuery } from '@apollo/client'
import { VerticalList } from '../../components/VerticalList'
import { Sorter } from '../../components/Sorter'
import { RouteComponentProps } from 'react-router-dom'
import { CATEGORIES } from '../../utils/constants'
import { CategoryDashboardRouteProps } from '../../types/routeProps'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { replaceHyphensWithSlashes, replaceSlashesWithCommas } from '../../utils/parser'
import { scrolledToBottom } from '../../utils/scrolledToBottom'
import { ProductBlock } from './ProductBlock'

type Props = {} & RouteComponentProps<CategoryDashboardRouteProps>

export const CategoryDashboard = (props: Props) => {
  const { match } = props
  const category = CATEGORIES.filter((c) => String(c.id) === match.params.categoryId)[0]

  const [pageList, setPageList] = useState<number[]>([0])

  // useState를 활용해서 sorter 상태 관리
  const [sorter, setSorter] = useState('sellCountDesc')
  const sorterChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSorter(event.target.value)
  }

  let page = 1
  let onePageLength = 10

  const scrollEventHandler = () => {
    if (scrolledToBottom()) {
      setPageList([...pageList, page * onePageLength])
      page++
      console.log(pageList)
    }
  }

  window.addEventListener('scroll', scrollEventHandler)

  return (
    <div>
      <Header title={`${replaceSlashesWithCommas(category.name)}`} />
      <Sorter sorterChangeHandler={sorterChangeHandler} />
      <div>current sorter is {sorter}</div>
      {pageList.map((el) => {
        return (
          <ProductBlock
            page={el}
            onePageLength={onePageLength}
            sorter={sorter}
            categoryName={category.name}
          />
        )
      })}
      <Footer />
    </div>
  )
}
