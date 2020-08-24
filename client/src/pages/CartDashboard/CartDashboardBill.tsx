import React from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { BAEDAL_TIP } from '../../utils/constants'
import { STYLES, COLORS } from '../../utils/styleConstants'

type Props = {
  summary: { totalPrice: number; totalCount: number }
}

const StyledContainer = styled.div`
  background-color: white;
  margin-top: ${STYLES.margin};
  padding: 20px ${STYLES.padding};

  .warning {
    text-align: right;
    font-size: 14px;
    color: ${COLORS.red};
  }
`
const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  padding: 6px 0;
`

export const CartDashboardBill = (props: Props) => {
  const { totalCount, totalPrice } = props.summary

  const hurdle = totalCount === 0 || totalPrice < 5000

  return (
    <StyledContainer>
      <StyledRow className="row">
        <div className="description">주문금액</div>
        <div className="price">{parseToLocalMoneyString(totalPrice)}원</div>
      </StyledRow>
      <StyledRow className="row">
        <div className="description">배달팁</div>
        <div className="price">{`${!hurdle ? parseToLocalMoneyString(BAEDAL_TIP) : '0'}원`}</div>
      </StyledRow>
      {hurdle && <div className="warning">최소주문금액 5,000원</div>}
    </StyledContainer>
  )
}
