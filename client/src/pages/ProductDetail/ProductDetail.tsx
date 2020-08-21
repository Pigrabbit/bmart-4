import React, { useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { ProductDetailRouteProps } from '../../types/routeProps'
import { CarouselBasic } from '../../components/CarouselBasic'
import { OrderModal } from '../../components/OrderModal'
import { GET_PRODUCT_DETAIL_IMG_SRC_LIST } from '../../apis/graphqlQuery'
import { useQuery } from '@apollo/client'
import { LoadingIndicator } from '../../components/LoadingIndicator'
import { parseToLocalMoneyString } from '../../utils/parser'
import { STYLES, COLORS } from '../../utils/styleConstants'

type Props = {} & RouteComponentProps<ProductDetailRouteProps>

type StateType = { coupangProductId: string } | any

const StyledContainer = styled.div`
  height: 100%;

  .confirm-slider[data-is-order-placed=\'true\'] {
    animation: 1s ease-in-out slideUp;
  }
  @keyframes slideUp {
    1% {
      transform: translateY(0);
    }
    99% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`

const StyledSlider = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(100%);

  .confirm-slider-content {
    width: 70%;
    text-align: center;
    background-color: ${COLORS.gray};
    color: #fff;
    font-size: 16px;
    padding: 5px 0;
    border-radius: ${STYLES.smallRadius};
    opacity: 0;
  }
  .confirm-slider-content[data-is-order-placed=\'true\'] {
    animation: 1s ease-in-out showContent;
  }

  @keyframes showContent {
    1% {
      opacity: 1;
    }
    99% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
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
  border-radius: ${STYLES.smallRadius};
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
    font-size: 24px;
    font-weight: 700;
  }

  .product-detail-price {
    margin-top: 15px;
    font-size: 16px;
  }
  .product-detail-discount {
    margin-top: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .product-detail-base-price {
    font-size: 16px;
    text-decoration: line-through;
  }
  .product-detail-discount-rate {
    margin: 0 0 2px 8px;
    font-size: 16px;
    color: #eb4d4b;
  }
`

export const ProductDetail = (props: Props) => {
  const { location } = props
  const state: StateType = location.state || null
  const { id, price, name, coupangProductId, basePrice, discountRate } = state

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [savedCount, setSavedCount] = useState(1)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const { loading, data } = useQuery(GET_PRODUCT_DETAIL_IMG_SRC_LIST, {
    variables: { coupangProductId: parseInt(coupangProductId) },
  })
  if (loading) return <LoadingIndicator />
  const { productDetailImgList } = data

  return (
    <StyledContainer className="product-detail">
      <StyledSlider className="confirm-slider" data-is-order-placed={isOrderPlaced} onAnimationEnd={() => setIsOrderPlaced(false)}>
        <div className="confirm-slider-content" data-is-order-placed={isOrderPlaced} onAnimationEnd={() => setIsOrderPlaced(false)}>
          장바구니에 상품이 담겼습니다
        </div>
      </StyledSlider>
      <CarouselBasic bannerList={productDetailImgList} />
      <StyledDetailInfo className="product-detail-info">
        <p className="product-detail-name">{name}</p>
        {discountRate > 0 ? (
          <div className="product-detail-discount">
            <p className="product-detail-base-price">{parseToLocalMoneyString(basePrice)}원</p>
            <p className="product-detail-discount-rate">{discountRate}% ↓</p>
          </div>
        ) : (
          ''
        )}
        <p className="product-detail-price">{parseToLocalMoneyString(price)}원</p>
      </StyledDetailInfo>
      <StyledOrderButton
        className="product-detail-order-btn"
        onClick={() => {
          setIsModalVisible(true)
        }}
      >
        주문하기
      </StyledOrderButton>
      {isModalVisible ? (
        <OrderModal
          id={id}
          name={name}
          price={price}
          thumbnailSrc={productDetailImgList[0].src}
          savedCount={savedCount}
          setSavedCount={setSavedCount}
          setIsModalVisible={setIsModalVisible}
          setIsOrderPlaced={setIsOrderPlaced}
        />
      ) : (
        ''
      )}
    </StyledContainer>
  )
}
