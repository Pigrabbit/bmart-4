import React, { useState } from 'react'
import styled from 'styled-components'
import { OrderHistory } from '../../apis/graphqlQuery'
import { STYLES } from '../../utils/styleConstants'
import { toLocalDateString, parseToLocalMoneyString } from '../../utils/parser'

type Props = {
  orderHistory: OrderHistory
}

const StyledContainer = styled.div``

const StyledContent = styled.div`
  margin: ${STYLES.margin};
  border: 1px solid black;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
`

const StyledData = styled.div`
  margin-left: 8px;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .history-item-date {
    font-size: 18px;
    font-weight: 700;
  }
`

const StyledToggleBtn = styled.button`
  margin: 15px;
  i {
    font-size: 24px;
  }
`

export const HistoryCard = (props: Props) => {
  const { orderHistory } = props
  const { orderedAt, cartProductList } = orderHistory

  const [title, setTitle] = useState(cartProductList[0].product.name)
  const [quantity, setQuantity] = useState(cartProductList.length)
  const [orderSum, setOrderSum] = useState(
    cartProductList.reduce((acc, cur) => {
      return acc + cur.priceSum
    }, 0)
  )
  const [isDetailOpened, setIsDetailOpened] = useState(false)

  return (
    <StyledContainer className="history-item" onClick={() => setIsDetailOpened(!isDetailOpened)}>
      <StyledContent className="history-item-content">
        <StyledData className="history-item-data">
          <p className="history-item-date">{toLocalDateString(orderedAt)}</p>
          <p className="history-item-title">
            {title} 외 {quantity}건
          </p>
          <p className="history-item-total-price">{parseToLocalMoneyString(orderSum)}원</p>
        </StyledData>
        <StyledToggleBtn className="history-toggle-btn">
          {isDetailOpened ? (
            <i className="icon">chevron_up</i>
          ) : (
            <i className="icon">chevron_down</i>
          )}
        </StyledToggleBtn>
      </StyledContent>
      {isDetailOpened ? (
        <div className="history-detail">
          {cartProductList.map((cartProduct, idx) => (
            <div key={idx}>
              <div>{cartProduct.quantity}</div>
              <div>{cartProduct.priceSum}</div>
            </div>
          ))}
        </div>
      ) : (
        ''
      )}
    </StyledContainer>
  )
}
