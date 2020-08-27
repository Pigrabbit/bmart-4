import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import { CarouselBasic } from '../../components/CarouselBasic'
import { OrderModal } from '../../components/OrderModal'
import {
  GET_PRODUCT_DETAIL_IMG_SRC_LIST,
  ProductDetailImgData,
  ProductDetailImgVars,
  ProductByIdData,
  ProductByIdVars,
  GET_PRODUCT_BY_ID,
} from '../../apis/product'
import { useQuery } from '@apollo/client'
import { LoadingIndicator } from '../../components/LoadingIndicator'
import { parseToLocalMoneyString } from '../../utils/parser'
import { STYLES, COLORS, HEADER_HEIGHT } from '../../utils/styleConstants'
import { OrderButton } from '../../components/OrderButton'
import { Dashboard } from '../../components/Dashboard'
import { ProductDetailRouteProps } from '../../types/routeProps'
import { LikeButton } from '../../components/LikeButton'

type Props = {}

const StyledContainer = styled.div`
  background-color: white;

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

const StyledLikeButtonWrapper = styled.div`
  position: absolute;
  right: ${STYLES.padding};
  bottom: ${STYLES.padding};
`

const StyledSlider = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(100%);

  .confirm-slider-content {
    width: 70%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.6);
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

const StyledDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-items: center;
  z-index: 100;
  position: relative;
  background: white;
  margin-top: -20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.1);

  .product-detail-name {
    font-size: 24px;
    font-weight: 700;
  }

  .product-detail-price {
    margin-top: 16px;
    font-size: 22px;
    font-weight: 700;
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
    color: ${COLORS.gray};
  }
  .product-detail-discount-rate {
    margin: 0 0 2px 8px;
    font-size: 16px;
    color: #eb4d4b;
  }
`
const StyledDetails = styled.div`
  padding: ${STYLES.padding} ${STYLES.padding} 40px ${STYLES.padding};

  .row {
    display: flex;
    justify-content: space-between;
    padding: 7px 0;
    font-size: 14px;

    .name {
      font-weight: 700;
      width: 70px;
    }

    .description {
      width: calc(100% - 70px);

      b {
        margin: 0 4px;
      }
    }
  }
`
const StyledInformations = styled.div`
  padding: 20px ${STYLES.padding};
  padding-top: 40px;
  position: relative;
`
const StyledCarouselWrap = styled.div`
  position: sticky;
  top: calc((${HEADER_HEIGHT} / 2));
`
const StyledThumbnails = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
  }
`

export type StateType = {
  id: string
  price: number
  name: string
  coupangProductId: string
  basePrice: number
  discountRate: number
  stockCount: number
}

export const ProductDetail = (props: Props) => {
  const match = useRouteMatch<ProductDetailRouteProps>()
  const id = match.params.productId

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [savedCount, setSavedCount] = useState(1)
  const [isOrderPlaced, setIsOrderPlaced] = useState(false)

  const product = useQuery<ProductByIdData, ProductByIdVars>(GET_PRODUCT_BY_ID, {
    variables: { id },
  })

  const detailImg = useQuery<ProductDetailImgData, ProductDetailImgVars>(
    GET_PRODUCT_DETAIL_IMG_SRC_LIST,
    {
      variables: { id },
    }
  )

  useEffect(() => {
    window.scrollTo(0, 0)
    product.refetch()
    detailImg.refetch()
  }, [])

  return detailImg.loading || !detailImg.data || product.loading || !product.data ? (
    <LoadingIndicator />
  ) : (
    <Dashboard title="상세정보" navbar={false} footer={false}>
      <StyledContainer className="product-detail">
        <StyledSlider
          className="confirm-slider"
          data-is-order-placed={isOrderPlaced}
          onAnimationEnd={() => setIsOrderPlaced(false)}
        >
          <div
            className="confirm-slider-content"
            data-is-order-placed={isOrderPlaced}
            onAnimationEnd={() => setIsOrderPlaced(false)}
          >
            장바구니에 상품이 담겼습니다
          </div>
        </StyledSlider>
        <StyledCarouselWrap>
          <CarouselBasic bannerList={detailImg.data.productDetailImgList} />
        </StyledCarouselWrap>
        <StyledDetailInfo className="product-detail-info">
          <StyledInformations className="product-informations">
            <p className="product-detail-name">{product.data.productById.name}</p>
            {product.data.productById.discountRate > 0 ? (
              <div className="product-detail-discount">
                <p className="product-detail-base-price">
                  {parseToLocalMoneyString(product.data.productById.basePrice)}원
                </p>
                <p className="product-detail-discount-rate">
                  {product.data.productById.discountRate}% ↓
                </p>
              </div>
            ) : (
              ''
            )}
            <p className="product-detail-price">
              {parseToLocalMoneyString(product.data.productById.price)}원
            </p>
            <StyledLikeButtonWrapper>
              {product.variables && product.variables.id ? (
                <LikeButton
                  isLiked={product.data.productById.isLiked}
                  productId={product.variables.id}
                />
              ) : (
                ''
              )}
            </StyledLikeButtonWrapper>
          </StyledInformations>
          <StyledDetails>
            <div className="row">
              <div className="name">배달 정보</div>
              <div className="description">
                배달시간<b>27~37분</b>예상
              </div>
            </div>
            <div className="row">
              <div className="name">적립 혜택</div>
              <div className="description">배민페이로 결제하면 포인트 0.5% 적립</div>
            </div>
            <div className="row">
              <div className="name">원산지표시</div>
              <div className="description">하단 상세 내용 참고</div>
            </div>
          </StyledDetails>
          <StyledThumbnails>
            {detailImg.data.productDetailImgList.map((item, idx) => (
              <div className="detail-thumbnail" key={idx}>
                <img src={item.src} alt="" />
              </div>
            ))}
          </StyledThumbnails>
        </StyledDetailInfo>
        <OrderButton
          disabled={product.data.productById.stockCount === 0}
          clickHandler={() => setIsModalVisible(true)}
        >
          <>{product.data.productById.stockCount === 0 ? '재고가 부족합니다' : '주문하기'}</>
        </OrderButton>
        {isModalVisible ? (
          <OrderModal
            id={id}
            name={product.data.productById.name}
            price={product.data.productById.price}
            stockCount={product.data.productById.stockCount}
            thumbnailSrc={detailImg.data.productDetailImgList[0].src}
            savedCount={savedCount}
            setSavedCount={setSavedCount}
            setIsModalVisible={setIsModalVisible}
            setIsOrderPlaced={setIsOrderPlaced}
          />
        ) : (
          ''
        )}
      </StyledContainer>
    </Dashboard>
  )
}
