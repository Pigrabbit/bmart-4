import React from 'react'
import styled from 'styled-components'
import { ProductInCart } from './CartDashboard'
import { OrderCard } from './OrderCard'
import { STYLES } from '../../utils/styleConstants'

type Props = {
  orderList: ProductInCart[]
  refetch: () => void
}

const StyledContainer = styled.div`
  background-color: white;
  margin-top: ${STYLES.margin};
  padding: 0 ${STYLES.padding};
`

export const CartDashboardBody = (props: Props) => {
  const { orderList } = props
  return (
    <StyledContainer className="cart-dashboard-body">
      {orderList.map((order, idx) => (
        <OrderCard key={idx} order={order} refetch={props.refetch} />
      ))}
    </StyledContainer>
  )
}
