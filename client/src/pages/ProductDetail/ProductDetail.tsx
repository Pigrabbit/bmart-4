import React, { useState, useRef, MouseEvent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { ProductDetailRouteProps } from '../../types/routeProps'
import { CarouselBasic } from '../../components/CarouselBasic'
import { productBannerList } from '../../utils/mockData'

type Props = {} & RouteComponentProps<ProductDetailRouteProps>

type StateType = { coupangProductId: string } | any

const StyledContainer = styled.div`
  height: 100%;
  position: relative;

  .product-detail-order-btn {
    position: absolute;
    bottom: 0;
    left: 10%;
    padding: 15px 0;
    width: 80%;
    font-size: 1rem;
    border: 1px solid black;
    border-radius: 5px;
  }
`

const StyledDetailInfo = styled.div`
  margin: 60px 30px;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-items: center;
  height: 250px;

  .product-detail-name {
    font-size: 36px;
    font-weight: 700;
  }

  .product-detail-price {
    margin-top: 15px;
    font-size: 18px;
  }
`
const StyledOrderPanel = styled.div`
  img.order-modal-content-thumbnail {
    width: 100%;
  }
`
const StyledOrderModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .order-modal-overlay {
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    position: absolute;
  }

  @keyframes slideUpModal {
    0% {
      transform: translateY(400px);
    }
    100% {
      transform: translateY(0);
    }
  }

  .order-modal-content {
    position: absolute;
    bottom: 0;
    padding: 16px;

    width: 100%;
    height: 40%;
    background-color: white;
    border-radius: 20px 20px 0 0;
    animation: 0.3s ease-in slideUpModal;
  }

  .order-modal-content-row {
    margin-top: 15px;
    display: grid;
    grid-template-columns: 3fr 6fr 3fr;
    justify-items: stretch;
    align-items: center;
  }

  .order-modal-content-row-data {
    margin: 0 15px;
    p {
      font-size: 16px;
    }
    .order-modal-content-row-name {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .order-modal-content-row-price {
      font-weight: 300;
    }
  }

  .order-modal-controller {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 50%;
    border-radius: 20px;
    background-color: #bbb;
    font-size: 12px;

    button {
      width: 100%;
      height: 100%;
    }
  }

  .order-modal-content-order-btn {
    grid-column: 1/13;
    margin-top: 30px;
    border: 1px solid #bbb;
    border-radius: 5px;
    padding: 15px 0;
  }
`

const mockProductData = {
  name: '건강 샐러드',
  price: '3,500',
}

export const ProductDetail = (props: Props) => {
  const { match, location } = props
  const [isModalVisible, setIsModalVisible] = useState(false)
  const modalOverlayRef = useRef<HTMLDivElement>(null)

  const state: StateType = location.state ? location.state : null
  const { coupangProductId } = state

  const { name, price } = mockProductData

  const clickOutsideModalHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.target === modalOverlayRef.current) setIsModalVisible(!isModalVisible)
  }

  return (
    <StyledContainer className="product-detail">
      <CarouselBasic bannerList={productBannerList} />
      <StyledDetailInfo className="product-detail-info">
        <p className="product-detail-name">{name}</p>
        <p className="product-detail-price">{price}원</p>
      </StyledDetailInfo>
      <button
        className="product-detail-order-btn"
        onClick={() => setIsModalVisible(!isModalVisible)}
      >
        주문하기
      </button>
      {isModalVisible ? (
        <StyledOrderModal className="order-modal" onClick={clickOutsideModalHandler}>
          <div className="order-modal-overlay" ref={modalOverlayRef} />
          <StyledOrderPanel className="order-modal-content">
            <div className="order-modal-content-row">
              <img className="order-modal-content-thumbnail" src={productBannerList[0].src} />
              <div className="order-modal-content-row-data">
                <p className="order-modal-content-row-name">{name}</p>
                <p className="order-modal-content-row-price">{price}원</p>
              </div>
              <div className="order-modal-controller">
                <button className="order-modal-controller-decrement-btn">-</button>
                <p className="order-modal-controller-quantity">1</p>
                <button className="order-modal-controller-increment-btn">+</button>
              </div>
              <button className="order-modal-content-order-btn">주문하기</button>
            </div>
          </StyledOrderPanel>
        </StyledOrderModal>
      ) : (
        ''
      )}
      {/* {match.params.productId}번 상품 상세페이지 입니다.
      coupang id: {coupangProductId} */}
    </StyledContainer>
  )
}
