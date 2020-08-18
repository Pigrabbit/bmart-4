import React from 'react'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_BY_CATEGORY } from '../../apis/graphqlQuery'
import { VerticalList } from '../../components/VerticalList'
import { Filter } from '../../components/Filter'
import { RouteComponentProps } from 'react-router-dom'
import { CategoryNameRouteProps } from '../../types/routeProps'
import { replaceHyphensWithCommas, replaceHyphensWithSlashes } from '../../utils/parser'

type Props = {} & RouteComponentProps<CategoryNameRouteProps>

export const CategoryDashboard = (props: Props) => {
  const { match } = props
  const { loading, error, data } = useQuery(GET_PRODUCTLIST_BY_CATEGORY, {
    variables: {
      category: replaceHyphensWithSlashes(match.params.categoryName),
      offset: 100,
      limit: 100,
    },
  })
  if (loading) return <p>Loading...</p>
  const { productListByCategory } = data
  console.log(productListByCategory)
  return (
    <div>
      <Header title={`${replaceHyphensWithCommas(match.params.categoryName)}`} />
      <Filter />
      <VerticalList title="" productList={productListByCategory} />
      <Footer />
    </div>
  )
}
