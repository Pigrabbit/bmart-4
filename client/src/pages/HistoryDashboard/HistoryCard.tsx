import React, { useState } from 'react'
import styled from 'styled-components'
import { OrderHistory } from '../../apis/graphqlQuery'
import { STYLES, COLORS } from '../../utils/styleConstants'
import { toLocalDateString, parseToLocalMoneyString } from '../../utils/parser'
import { HistoryCardDetail } from './HistoryCardDetail'

type Props = {
  orderHistory: OrderHistory
}

const StyledContainer = styled.div`
  margin: ${STYLES.margin};
  border: 1px solid black;
  border-radius: 6px;

  .history-detail-list {
    height: 100%;
    margin: 6px 0;
    display: grid;
    align-items: stretch;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, minmax(30px, 1fr));
  }

  .history-detail-item:nth-child(odd) {
    background-color: ${COLORS.lightGray};
    color: #fff;
  }
`

const StyledContent = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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

  .history-item-total-price {
    font-weight: 500;
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

  const [title, setTitle] = useState<string>(cartProductList[0].product.name)
  const [quantity, setQuantity] = useState<number>(cartProductList.length)
  const [orderSum, setOrderSum] = useState<number>(
    cartProductList.reduce((acc, cur) => {
      return acc + cur.priceSum
    }, 0)
  )
  const [isDetailOpened, setIsDetailOpened] = useState<boolean>(false)

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
        <div className="history-detail-list">
          {cartProductList.map((cartProduct, idx) => (
            <HistoryCardDetail key={idx} cartProduct={cartProduct} />
          ))}
        </div>
      ) : (
        ''
      )}
    </StyledContainer>
  )
}
