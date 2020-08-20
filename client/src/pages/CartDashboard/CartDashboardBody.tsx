import React from 'react'
import styled from 'styled-components'
import { OrderCard } from './OrderCard'
import { STYLES } from '../../utils/styleConstants'
import {
  ModifyProductQuantityVars,
  DeleteProductFromCartVars,
  ProductInCart,
} from '../../apis/graphqlQuery'
import { CheckedProduct } from './CartDashboard'

type Props = {
  orderList: ProductInCart[]
  checkedProductList: CheckedProduct[]
  setCheckedProductList: (checkedProductList: CheckedProduct[]) => void
  modifyProductQuantityHandler: (variables: ModifyProductQuantityVars) => void
  deleteProductFromCartHandler: (variables: DeleteProductFromCartVars) => void
}

const StyledContainer = styled.div`
  background-color: white;
  margin-top: ${STYLES.margin};
  padding: 0 ${STYLES.padding};
`

export const CartDashboardBody = (props: Props) => {
  const { orderList, checkedProductList } = props

  const toggleCheckboxHandler = (productOrderId: string) => {
    props.setCheckedProductList(
      checkedProductList.map((p) =>
        p.productOrderId === productOrderId ? { ...p, checked: !p.checked } : { ...p }
      )
    )
  }

  return (
    <StyledContainer className="cart-dashboard-body">
      {orderList.map((order, idx) => (
        <OrderCard
          key={idx}
          order={order}
          checked={checkedProductList[idx]?.checked || false}
          toggleCheckboxHandler={() => toggleCheckboxHandler(order.id)}
          modifyProductQuantityHandler={props.modifyProductQuantityHandler}
          deleteProductFromCartHandler={props.deleteProductFromCartHandler}
        />
      ))}
    </StyledContainer>
  )
}
