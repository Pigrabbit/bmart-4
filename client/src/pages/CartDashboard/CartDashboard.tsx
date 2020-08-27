import React, { useCallback, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Dashboard } from '../../components/Dashboard'
import { useQuery, useMutation } from '@apollo/client'
import {
  GET_PRODUCTLIST_IN_CART,
  DELETE_PRODUCT_FROM_CART,
  MODIFY_PRODUCT_QUANTITY,
  ModifyProductQuantityVars,
  DeleteProductFromCartVars,
  ProductInCart,
  ProductInCartData,
  ModifyProductQuantityData,
  DeleteProductFromCartData,
} from '../../apis/graphqlQuery'
import { CartDashboardHeader } from './CartDashboardHeader'
import { CartDashboardOrderList } from './CartDashboardOrderList'
import { CartDashboardOrderButton } from './CartDashboardOrderButton'
import { CartDashboardFooter } from './CartDashboardFooter'
import { CartDashboardBill } from './CartDashboardBill'
import { CenteredImg } from '../../components/CenteredImg'

type Props = {}

export type CheckedProduct = { productOrderId: string; checked: boolean }

const StyledContainer = styled.div``

export const CartDashboard = (props: Props) => {
  const { loading, data, refetch } = useQuery<ProductInCartData>(GET_PRODUCTLIST_IN_CART, {
    variables: {},
  })
  const [modifyProductQuantity] = useMutation<ModifyProductQuantityData, ModifyProductQuantityVars>(
    MODIFY_PRODUCT_QUANTITY
  )
  const [deleteProductFromCart] = useMutation<DeleteProductFromCartData, DeleteProductFromCartVars>(
    DELETE_PRODUCT_FROM_CART
  )

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [orderList, setOrderList] = useState<ProductInCart[]>([])
  const [checkedProductList, setCheckedProductList] = useState<CheckedProduct[]>([])

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    if (!data) return

    setCheckedProductList(
      data.productListInCart.map((order) => ({
        productOrderId: order.id,
        checked: true,
      }))
    )
    setOrderList(data.productListInCart)

    setIsLoading(false)
  }, [data])

  const getSummary = useCallback(
    () => ({
      totalPrice:
        orderList.reduce((acc, cur, idx) => {
          return checkedProductList.length && checkedProductList[idx].checked
            ? acc + cur.priceSum
            : acc
        }, 0) || 0,
      totalCount: checkedProductList.filter((c) => c.checked).length || 0,
    }),
    [orderList, checkedProductList]
  )

  const modifyProductQuantityHandler = async (variables: ModifyProductQuantityVars) => {
    const { data } = await modifyProductQuantity({ variables })
    if (!data?.modifyProductQuantity.success) return

    setOrderList(
      orderList.map((order) =>
        order.id === variables.orderProductId
          ? {
              ...order,
              quantity: variables.quantity,
              priceSum: variables.quantity * order.product.price,
            }
          : { ...order }
      )
    )
  }

  const deleteProductFromCartHandler = async (variables: DeleteProductFromCartVars) => {
    await deleteProductFromCart({ variables })

    let newOrderList: ProductInCart[] = []
    let newCheckedProductList: CheckedProduct[] = []
    orderList.map((order, idx) => {
      const existIdx = variables.orderProductIds.indexOf(order.id)
      if (existIdx < 0) {
        newOrderList.push({ ...order })
        newCheckedProductList.push({ ...checkedProductList[idx] })
      }
    })

    setOrderList(newOrderList)
    setCheckedProductList(newCheckedProductList)
  }

  if (isLoading) return <p>...loading</p>

  return (
    <Dashboard title="장바구니" footer={false} navbar={false}>
      {orderList.length > 0 ? (
        <StyledContainer className="cart-dashboard">
          <CartDashboardHeader
            checkedProductList={checkedProductList}
            setCheckedProductList={setCheckedProductList}
            deleteProductFromCartHandler={deleteProductFromCartHandler}
          />
          <CartDashboardOrderList
            orderList={orderList}
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
        <CenteredImg src="images/cart-tung.png" />
      )}
    </Dashboard>
  )
}
