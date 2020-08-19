import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { ProductDetailRouteProps } from '../../types/routeProps'
import { CarouselBasic } from '../../components/CarouselBasic'
import { productBannerList } from '../../utils/mockData'

type Props = {} & RouteComponentProps<ProductDetailRouteProps>

type StateType = { coupangProductId: string } | any

const StyledContainer = styled.div`
  margin: 30px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-items: center;

  .product-detail-name {
    font-size: 24px;
    font-weight: 700;
  }

  .product-detail-price {
    font-size: 12px;
  }

  .product-detail-order-btn {
    margin-top: 15px;
    padding: 15px 0;
    width: 100%;
    height: 100%;
    font-size: 1rem;
    border: 1px solid black;
    border-radius: 5px;
  }
`

const mockProductData = {
  name: '건강 샐러드',
  price: "3,500",
}

export const ProductDetail = (props: Props) => {
  const { match, location } = props
  const state: StateType = location.state ? location.state : null
  const { coupangProductId } = state

  const { name, price } = mockProductData

  return (
    <div className="product-detail">
      <CarouselBasic bannerList={productBannerList} />
      <StyledContainer>
        <p className="product-detail-name">{name}</p>
        <p className="product-detail-price">{price}원</p>
        <button className="product-detail-order-btn">주문하기</button>
      </StyledContainer>
      {/* {match.params.productId}번 상품 상세페이지 입니다.
      coupang id: {coupangProductId} */}
    </div>
  )
}
