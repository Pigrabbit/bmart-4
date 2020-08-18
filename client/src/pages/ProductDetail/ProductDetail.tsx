import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ProductDetailRouteProps } from '../../types/routeProps'
import { Carousel } from '../../components/Carousel'
import { productBannerList } from '../../utils/mockData'

type Props = {} & RouteComponentProps<ProductDetailRouteProps>

type StateType = { coupangProductId: string } | any

export const ProductDetail = (props: Props) => {
  const { match, location } = props
  const state: StateType = location.state ? location.state: null;
  const { coupangProductId } = state

  return (
    <div className='product-detail'>
      <Carousel bannerList={productBannerList} autoSlide={false}/>
      {match.params.productId}번 상품 상세페이지 입니다.
      coupang id: {coupangProductId}
    </div>
  )
}
