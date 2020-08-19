import React, { useState, useEffect } from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { VerticalList } from '../../components/VerticalList'
import { Filter } from '../../components/Filter'
import { RouteComponentProps } from 'react-router-dom'
import { CategoryDashboardRouteProps } from '../../types/routeProps'
import { replaceHyphensWithSlashes, replaceSlashesWithCommas } from '../../utils/parser'
import { CATEGORIES } from '../../utils/constants'

type Props = {} & RouteComponentProps<CategoryDashboardRouteProps>

export const CategoryDashboard = (props: Props) => {
  const { match } = props
  const [filter, setFilter] = useState(0)
  const category = CATEGORIES.filter((c) => String(c.id) === match.params.categoryId)[0]

  const { loading, error, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {
    variables: {
      category: replaceHyphensWithSlashes(category.name),
      offset: 100,
      limit: 100,
    },
  })

  if (loading) return <p>Loading...</p>
  const { productListByCategory } = data

  const changeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(parseInt(event.target.value))
    console.log('new filter is', event.target.value)
  }

  return (
    <div>
      <Header title={`${replaceSlashesWithCommas(category.name)}`} />
      <Filter fn={changeFilter} />
      <div>current filter is {filter}</div>
      <VerticalList title="" filter={filter} productList={productListByCategory} />
      <Footer />
    </div>
  )
}
