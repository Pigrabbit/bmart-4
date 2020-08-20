import React, { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { VerticalList } from '../../components/VerticalList'
import { Sorter } from '../../components/Sorter'
import { RouteComponentProps } from 'react-router-dom'
import { CategoryDashboardRouteProps } from '../../types/routeProps'
import { replaceHyphensWithSlashes, replaceSlashesWithCommas } from '../../utils/parser'
import { CATEGORIES } from '../../utils/constants'

type Props = {} & RouteComponentProps<CategoryDashboardRouteProps>

export const CategoryDashboard = (props: Props) => {
  const { match } = props
  const category = CATEGORIES.filter((c) => String(c.id) === match.params.categoryId)[0]

  // useState를 활용해서 sorter 상태 관리
  const [sorter, setSorter] = useState(0)
  const changeSorter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSorter(parseInt(event.target.value))
  }

  const { loading, error, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {
    variables: {
      category: replaceHyphensWithSlashes(category.name),
      offset: 100,
      limit: 100,
      sorter: Number(sorter),
    },
  })

  if (loading)
    return (
      <div>
        <Header title={`${replaceSlashesWithCommas(category.name)}`} />
        <Sorter fn={changeSorter} />
        <div>Loading...</div>
        <Footer />
      </div>
    )
  const { productListByCategory } = data

  return (
    <div>
      <Header title={`${replaceSlashesWithCommas(category.name)}`} />
      <Sorter fn={changeSorter} />
      <div>current sorter is {sorter}</div>
      <VerticalList title="" sorter={sorter} productList={productListByCategory} />
      <Footer />
    </div>
  )
}
