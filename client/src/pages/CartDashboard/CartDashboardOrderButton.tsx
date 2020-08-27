import React, { useEffect, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import {
  BAEDAL_TIP,
  MIN_ORDER_PRICE,
  MIN_PRODUCT_PURCHASE_LIMIT,
  MAX_PRODUCT_PURCHASE_LIMIT,
} from '../../utils/constants'
import { OrderButton } from '../../components/OrderButton'

type Props = {
  summary: { totalPrice: number; totalCount: number; stockValidate: boolean }
  clickCheckoutButtonHandler: () => void
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
  const { totalCount, totalPrice, stockValidate } = props.summary

  const hurdle =
    totalCount < MIN_PRODUCT_PURCHASE_LIMIT ||
    totalCount > MAX_PRODUCT_PURCHASE_LIMIT ||
    totalPrice < MIN_ORDER_PRICE ||
    !stockValidate

  return (
    <OrderButton disabled={hurdle} clickHandler={props.clickCheckoutButtonHandler}>
      <>
        {!hurdle && <StyledOrderCount className="order-count">{totalCount}</StyledOrderCount>}
        {!hurdle
          ? `${parseToLocalMoneyString(totalPrice + BAEDAL_TIP)}원 배달 주문하기`
          : stockValidate
          ? '최소주문금액을 채워주세요'
          : '품절상품이 포함되어 있습니다'}
      </>
    </OrderButton>
  )
}
