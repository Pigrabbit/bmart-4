import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { Dashboard } from '../../components/Dashboard'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_PRODUCTLIST_IN_CART,
  DELETE_PRODUCT_FROM_CART,
  MODIFY_PRODUCT_QUANTITY,
  ModifyProductQuantityVars,
  DeleteProductFromCartVars,
  ProductInCartData,
  ProductInCartVars,
} from '../../apis/graphqlQuery'
import { CartDashboardHeader } from './CartDashboardHeader'
import { CartDashboardBody } from './CartDashboardBody'
import { CartDashboardOrderButton } from './CartDashboardOrderButton'
import { NotFound } from './NotFound'
import { CartDashboardFooter } from './CartDashboardFooter'

type Props = {} & RouteComponentProps

const StyledContainer = styled.div``

export const CartDashboard = (props: Props) => {
  const { loading, data, refetch } = useQuery<ProductInCartData, ProductInCartVars>(
    GET_PRODUCTLIST_IN_CART,
    { variables: { userId: 1 } }
  )

  const [modifyProductQuantity] = useMutation(MODIFY_PRODUCT_QUANTITY, {
    onCompleted: refetch,
  })

  const [deleteProductFromCart] = useMutation(DELETE_PRODUCT_FROM_CART, {
    onCompleted: refetch,
  })

  const modifyProductQuantityHandler = (variables: ModifyProductQuantityVars) => {
    modifyProductQuantity({ variables })
  }

  const deleteProductFromCartHandler = (variables: DeleteProductFromCartVars) => {
    deleteProductFromCart({ variables })
  }

  // const [checkedList, setCheckedList] = useState<boolean[]>([])

  const getSummary = useCallback(
    () => ({
      totalPrice:
        data?.productListInCart.reduce((acc, cur) => {
          return acc + cur.priceSum
        }, 0) || 0,
      totalCount: data?.productListInCart.length || 0,
    }),
    [data]
  )

  return (
    <Dashboard title="장바구니" footer={false} navbar={false}>
      {data && data.productListInCart.length > 0 ? (
        <StyledContainer className="cart-dashboard">
          <CartDashboardHeader />
          <CartDashboardBody
            orderList={data.productListInCart}
            modifyProductQuantityHandler={modifyProductQuantityHandler}
            deleteProductFromCartHandler={deleteProductFromCartHandler}
          />
          <CartDashboardFooter />
          <CartDashboardOrderButton summary={getSummary()} />
        </StyledContainer>
      ) : (
        <NotFound />
      )}
    </Dashboard>
  )
}
