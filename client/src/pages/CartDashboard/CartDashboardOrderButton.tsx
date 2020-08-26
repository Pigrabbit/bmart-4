import React from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { BAEDAL_TIP } from '../../utils/constants'
import { OrderButton } from '../../components/OrderButton'
import { useMutation } from '@apollo/client'
import { CHECKOUT_ORDER } from '../../apis/graphqlQuery'

type Props = {
  summary: { totalPrice: number; totalCount: number }
}

const StyledOrderCount = styled.div`
  border-radius: 50%;
  background-color: white;
  width: 19px;
  height: 19px;
  line-height: 19px;
  color: #10b3ad;
  font-size: 12px;
  margin-right: 8px;
`

export const CartDashboardOrderButton = (props: Props) => {
  const { totalCount, totalPrice } = props.summary

  const hurdle = totalCount === 0 || totalPrice < 5000

  const [checkoutOrder, { data }] = useMutation(CHECKOUT_ORDER)

  const clickCheckoutButtonHandler = () => {
    checkoutOrder()
  }

  return (
    <OrderButton hurdle={hurdle} clickHandler={clickCheckoutButtonHandler}>
      <>
        {!hurdle && <StyledOrderCount className="order-count">{totalCount}</StyledOrderCount>}
        {!hurdle
          ? `${parseToLocalMoneyString(totalPrice + BAEDAL_TIP)}원 배달 주문하기`
          : '최소주문금액을 채워주세요'}
      </>
    </OrderButton>
  )
}
