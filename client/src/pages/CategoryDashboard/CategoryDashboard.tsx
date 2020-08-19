import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { VerticalList } from '../../components/VerticalList'
import { Filter } from '../../components/Filter'
import { RouteComponentProps } from 'react-router-dom'
import { CategoryDashboardRouteProps } from '../../types/routeProps'
import { replaceHyphensWithSlashes, replaceSlashesWithCommas } from '../../utils/parser'
import { CATEGORIES } from '../../utils/constants'
import { Dashboard } from '../../components/Dashboard'

type Props = {} & RouteComponentProps<CategoryDashboardRouteProps>

export const CategoryDashboard = (props: Props) => {
  const { match } = props
  const category = CATEGORIES.filter((c) => String(c.id) === match.params.categoryId)[0]
  const { loading, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {
    variables: {
      userId: 1,
      category: replaceHyphensWithSlashes(category.name),
      offset: 100,
      limit: 100,
    },
  })
  if (loading) return <p>Loading...</p>
  const { productListByCategory } = data

  return (
    <Dashboard title={`${replaceSlashesWithCommas(category.name)}`}>
      <>
        <Filter />
        <VerticalList title="" productList={productListByCategory} />
      </>
    </Dashboard>
  )
}
