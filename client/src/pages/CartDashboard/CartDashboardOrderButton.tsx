import React from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { STYLES, COLORS } from '../../utils/styleConstants'
import { BAEDAL_TIP } from '../../utils/constants'

type Props = {
  summary: { totalPrice: number; totalCount: number }
}

const StyledContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: transparent;
`
const StyledButtonWrap = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 10px 10px 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`
const StyledOrderButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: ${STYLES.smallRadius};
  color: white;
  background-color: ${COLORS.baemint};
  font-size: 16px;
  font-weight: 700;

  &:disabled {
    background-color: #ccc;

    .order-count {
      display: none;
    }
  }

  .order-count {
    border-radius: 50%;
    background-color: white;
    width: 19px;
    height: 19px;
    line-height: 19px;
    color: #10b3ad;
    font-size: 12px;
    margin-right: 8px;
  }
`

export const CartDashboardOrderButton = (props: Props) => {
  const { totalCount, totalPrice } = props.summary

  const hurdle = totalCount === 0 || totalPrice < 5000

  return (
    <StyledContainer className="cart-dashboard-submit">
      <StyledButtonWrap>
        <StyledOrderButton disabled={hurdle}>
          <div className="order-count">{totalCount}</div>
          {!hurdle
            ? `${parseToLocalMoneyString(totalPrice + BAEDAL_TIP)}원 배달 주문하기`
            : '최소주문금액을 채워주세요'}
        </StyledOrderButton>
      </StyledButtonWrap>
    </StyledContainer>
  )
}
