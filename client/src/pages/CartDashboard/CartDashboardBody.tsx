import React from 'react'
import styled from 'styled-components'
import { OrderCard } from './OrderCard'
import { STYLES } from '../../utils/styleConstants'
import {
  ModifyProductQuantityVars,
  DeleteProductFromCartVars,
  ProductInCart,
} from '../../apis/graphqlQuery'

type Props = {
  orderList: ProductInCart[]
  modifyProductQuantityHandler: (variables: ModifyProductQuantityVars) => void
  deleteProductFromCartHandler: (variables: DeleteProductFromCartVars) => void
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
        <OrderCard
          key={idx}
          order={order}
          modifyProductQuantityHandler={props.modifyProductQuantityHandler}
          deleteProductFromCartHandler={props.deleteProductFromCartHandler}
        />
      ))}
    </StyledContainer>
  )
}
