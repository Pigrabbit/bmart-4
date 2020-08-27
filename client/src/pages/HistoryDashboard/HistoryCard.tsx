import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { STYLES, COLORS } from '../../utils/styleConstants'
import { toLocalDateString, parseToLocalMoneyString } from '../../utils/parser'
import { HistoryCardDetail } from './HistoryCardDetail'
import { OrderHistory } from '../../apis/order'

type Props = {
  orderHistory: OrderHistory
}

const StyledContainer = styled.div`
  margin-bottom: 10px;

  .history-detail-list {
    height: 100%;
    margin: 12px 0;
    border-bottom: 1px solid #eee;
  }

  .history-item-title {
    font-size: 14px;

    b {
      font-size: 16px;
      color: #555;
    }
  }

  .history-detail-item:nth-child(odd) {
    background-color: #eee;
    color: black;
  }
`

const StyledContent = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledData = styled.div`
  width: 100%;
  margin-left: 8px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .history-item-date {
    font-size: 15px;
    margin-bottom: 5px;
    color: #888;
  }

  .history-item-total-price {
    font-weight: 700;
    font-size: 21px;
    margin-top: 10px;
  }
`

const StyledToggleBtn = styled.button`
  margin: 15px;

  i {
    font-size: 24px;
    transform: rotate(0);
    transition: transform 300ms ease;

    &.up {
      transform: rotate(180deg);
    }
  }
`

export const HistoryCard = (props: Props) => {
  const { orderHistory } = props
  const { orderedAt, cartProductList } = orderHistory

  const orderSum = useMemo(
    () =>
      cartProductList.reduce((acc, cur) => {
        return acc + cur.priceSum
      }, 0),
    [cartProductList]
  )

  const [isDetailOpened, setIsDetailOpened] = useState<boolean>(false)

  const title = cartProductList[0]?.product.name || ''

  return (
    <StyledContainer className="history-item" onClick={() => setIsDetailOpened(!isDetailOpened)}>
      <StyledContent className="history-item-content">
        <StyledData className="history-item-data">
          <p className="history-item-date">{toLocalDateString(orderedAt)}</p>
          <p className="history-item-title">
            <b>{title}</b> 외 {cartProductList.length}건
          </p>
          <p className="history-item-total-price">{`${parseToLocalMoneyString(orderSum)}원`}</p>
        </StyledData>
        <StyledToggleBtn className="history-toggle-btn">
          <i className={`icon ${isDetailOpened ? 'up' : ''}`}>chevron_down</i>
        </StyledToggleBtn>
      </StyledContent>
      {isDetailOpened ? (
        <div className="history-detail-list">
          {cartProductList.map((cartProduct, idx) => (
            <HistoryCardDetail
              key={idx}
              productId={cartProduct.product.id}
              cartProduct={cartProduct}
            />
          ))}
        </div>
      ) : (
        ''
      )}
    </StyledContainer>
  )
}
