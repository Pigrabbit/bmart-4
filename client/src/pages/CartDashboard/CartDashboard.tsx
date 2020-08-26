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
import { NotFound } from './NotFound'
import { CartDashboardFooter } from './CartDashboardFooter'
import { CartDashboardBill } from './CartDashboardBill'

type Props = {}

export type CheckedProduct = { productOrderId: string; checked: boolean }

const StyledContainer = styled.div`
  .checkout-complete-modal[data-is-checkedout=\'true\'] {
    animation: 1.8s ease-in-out slideUp;
  }

  @keyframes slideUp {
    25% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-100%);
    }
  }
`

const StyledCheckoutCompleteModal = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(16, 178, 173, 0.9);
  transform: translateY(100%);
`

const StyledModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  .checkout-complete-modal-alert {
    font-family: 'BMHANNAPro';
    font-size: 48px;
    font-weight: 300;
    color: white;
    text-align: center;
  }
`

const StyledRider = styled.img`
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 30% 0 20% 0%;
`

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
  const [isCheckedOut, setIsCheckedOut] = useState<boolean>(false)

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
          <StyledCheckoutCompleteModal
            className="checkout-complete-modal"
            data-is-checkedout={isCheckedOut}
            onAnimationEnd={() => setIsCheckedOut(false)}
          >
            <StyledModalContent className="checkout-complete-modal-content">
              <p className="checkout-complete-modal-alert">결제완료</p>
              <StyledRider
                className="checkout-complete-modal-rider"
                src={`${process.env.PUBLIC_URL}/images/bmart_rider.png`}
              />
            </StyledModalContent>
          </StyledCheckoutCompleteModal>
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
          <CartDashboardOrderButton
            summary={getSummary()}
            isCheckedOut={isCheckedOut}
            setIsCheckedOut={setIsCheckedOut}
          />
        </StyledContainer>
      ) : (
        <NotFound />
      )}
    </Dashboard>
  )
}
