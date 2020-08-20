import React, { useCallback, useState, useEffect } from 'react'
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
import { CartDashboardOrderList } from './CartDashboardOrderList'
import { CartDashboardOrderButton } from './CartDashboardOrderButton'
import { NotFound } from './NotFound'
import { CartDashboardFooter } from './CartDashboardFooter'
import { CartDashboardBill } from './CartDashboardBill'

type Props = {} & RouteComponentProps

export type CheckedProduct = { productOrderId: string; checked: boolean }

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

  const [checkedProductList, setCheckedProductList] = useState<CheckedProduct[]>([])

  useEffect(() => {
    if (!data) return

    setCheckedProductList(
      data.productListInCart.map((order) => ({
        productOrderId: order.id,
        checked: true,
      }))
    )
  }, [loading])

  const getSummary = useCallback(
    () => ({
      totalPrice:
        data?.productListInCart.reduce((acc, cur, idx) => {
          return checkedProductList.length && checkedProductList[idx].checked
            ? acc + cur.priceSum
            : acc
        }, 0) || 0,
      totalCount: checkedProductList.filter((c) => c.checked).length || 0,
    }),
    [data, checkedProductList]
  )

  const modifyProductQuantityHandler = (variables: ModifyProductQuantityVars) => {
    modifyProductQuantity({ variables })
  }

  const deleteProductFromCartHandler = (variables: DeleteProductFromCartVars) => {
    deleteProductFromCart({ variables })
  }

  return (
    <Dashboard title="장바구니" footer={false} navbar={false}>
      {data && data.productListInCart.length > 0 ? (
        <StyledContainer className="cart-dashboard">
          <CartDashboardHeader
            checkedProductList={checkedProductList}
            setCheckedProductList={setCheckedProductList}
          />
          <CartDashboardOrderList
            orderList={data.productListInCart}
            checkedProductList={checkedProductList}
            setCheckedProductList={setCheckedProductList}
            modifyProductQuantityHandler={modifyProductQuantityHandler}
            deleteProductFromCartHandler={deleteProductFromCartHandler}
          />
          <CartDashboardBill summary={getSummary()} />
          <CartDashboardFooter />
          <CartDashboardOrderButton summary={getSummary()} />
        </StyledContainer>
      ) : (
        <NotFound />
      )}
    </Dashboard>
  )
}
