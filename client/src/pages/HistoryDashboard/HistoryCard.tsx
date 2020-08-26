import React, { useState } from 'react'
import styled from 'styled-components'
import { OrderHistory } from '../../apis/graphqlQuery'
import { STYLES } from '../../utils/styleConstants'
import { toLocalDateString } from '../../utils/parser'

type Props = {
  orderHistory: OrderHistory
}

const StyledContainer = styled.div`
  margin: ${STYLES.margin};
  border: 1px solid black;
`

export const HistoryCard = (props: Props) => {
  const { orderHistory } = props
  const [orderSum, setOrderSum] = useState(0)

  return (
    <StyledContainer className="history-item">
      <p className="history-item-date">{toLocalDateString(orderHistory.orderedAt)}</p>
      <p className="history-item-title">...외 1건</p>
      <p className="history-item-total-price">{orderSum}원</p>
    </StyledContainer>
  )
}
