import React, { useState } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { ProductDetailRouteProps } from '../../types/routeProps'
import { CarouselBasic } from '../../components/CarouselBasic'
import { productBannerList } from '../../utils/mockData'
import { OrderModal } from '../../components/OrderModal'

type Props = {} & RouteComponentProps<ProductDetailRouteProps>

type StateType = { coupangProductId: string } | any

const StyledContainer = styled.div`
  height: 100%;
`

const StyledOrderButton = styled.button`
  position: fixed;
  bottom: 15px;
  left: 10%;
  z-index: 2;
  padding: 15px 0;
  width: 80%;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #eef1f3;
`

const StyledDetailInfo = styled.div`
  margin: 60px 30px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-items: center;
  height: 100%;

  .product-detail-name {
    font-size: 36px;
    font-weight: 700;
  }

  .product-detail-price {
    margin-top: 15px;
    font-size: 18px;
  }
`

const mockProductData = {
  name: '건강 샐러드',
  price: 3500,
}

export const ProductDetail = (props: Props) => {
  const { match, location } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [savedCount, setSavedCount] = useState(1)

  const state: StateType = location.state || null
  const { coupangProductId } = state

  // TODO
  // match.params.productId, coupangProductId
  // 정보를 이용해 상품 상세 데이터 fetch

  const { name, price } = mockProductData

  return (
    <StyledContainer className="product-detail">
      <CarouselBasic bannerList={productBannerList} />
      <StyledDetailInfo className="product-detail-info">
        <p className="product-detail-name">{name}</p>
        <p className="product-detail-price">{price}원</p>
      </StyledDetailInfo>
      <StyledOrderButton
        className="product-detail-order-btn"
        onClick={() => setIsModalVisible(true)}
      >
        주문하기
      </StyledOrderButton>
      {isModalVisible ? (
        <OrderModal
          name={name}
          price={price}
          thumbnailSrc={productBannerList[0].src}
          savedCount={savedCount}
          setSavedCount={setSavedCount}
          setIsModalVisible={setIsModalVisible}
        />
      ) : (
        ''
      )}
      {/* state && state.coupangProductId && */}
    </StyledContainer>
  )
}