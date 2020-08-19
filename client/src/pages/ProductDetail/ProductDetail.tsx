import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ProductDetailRouteProps } from '../../types/routeProps'
import { Dashboard } from '../../components/Dashboard'

type Props = {} & RouteComponentProps<ProductDetailRouteProps>

export const ProductDetail = (props: Props) => {
  const { match } = props

  return (
    <Dashboard title="">
      <div>{match.params.productId}번 상품 상세페이지 입니다.</div>
    </Dashboard>
  )
}
