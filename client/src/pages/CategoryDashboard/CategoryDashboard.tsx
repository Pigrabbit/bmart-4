import React from 'react'
import { useQuery } from '@apollo/client'
import { RouteComponentProps } from 'react-router-dom'

import { Filter } from '../../components/Filter'
import { Dashboard } from '../../components/Dashboard'
import { VerticalList } from '../../components/VerticalList'
import { LoadingIndicator } from '../../components/LoadingIndicator'

import { CATEGORIES } from '../../utils/constants'
import { CategoryDashboardRouteProps } from '../../types/routeProps'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { replaceHyphensWithSlashes, replaceSlashesWithCommas } from '../../utils/parser'

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

  if (loading) return <LoadingIndicator />
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
