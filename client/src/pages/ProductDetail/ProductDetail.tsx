import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { ProductDetailRouteProps } from '../../types/routeProps'
import { Carousel } from '../../components/Carousel'
import { productBannerList } from '../../utils/mockData'

type Props = {} & RouteComponentProps<ProductDetailRouteProps>

export const ProductDetail = (props: Props) => {
  const { match } = props
  
  return (
    <div className='product-detail'>
      <Carousel bannerList={productBannerList} isAutoSlide={false}/>
      {match.params.productId}번 상품 상세페이지 입니다.
    </div>
  )
}
