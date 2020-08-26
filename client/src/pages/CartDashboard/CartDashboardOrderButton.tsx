import React, { useEffect, Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { BAEDAL_TIP, MIN_ORDER_PRICE } from '../../utils/constants'
import { OrderButton } from '../../components/OrderButton'
import { useMutation } from '@apollo/client'
import { CHECKOUT_ORDER, CheckoutOrderData } from '../../apis/graphqlQuery'
import { useHistory } from 'react-router-dom'

type Props = {
  summary: { totalPrice: number; totalCount: number }
  isCheckedOut: boolean
  setIsCheckedOut: Dispatch<SetStateAction<boolean>>
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
  const { isCheckedOut } = props
  const { totalCount, totalPrice } = props.summary

  const hurdle = totalCount === 0 || totalPrice < MIN_ORDER_PRICE

  const [checkoutOrder, { data }] = useMutation<CheckoutOrderData>(CHECKOUT_ORDER)
  const history = useHistory()

  const clickCheckoutButtonHandler = () => {
    checkoutOrder()
    props.setIsCheckedOut(true)
  }

  useEffect(() => {
    if (data?.checkoutOrder.success && !isCheckedOut) history.push('/history')
  }, [data, isCheckedOut])

  return (
    <OrderButton disabled={hurdle} clickHandler={clickCheckoutButtonHandler}>
      <>
        {!hurdle && <StyledOrderCount className="order-count">{totalCount}</StyledOrderCount>}
        {!hurdle
          ? `${parseToLocalMoneyString(totalPrice + BAEDAL_TIP)}원 배달 주문하기`
          : '최소주문금액을 채워주세요'}
      </>
    </OrderButton>
  )
}
