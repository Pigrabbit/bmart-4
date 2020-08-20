import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { Dashboard } from '../../components/Dashboard'
import { useQuery } from '@apollo/client'
import { GET_PRODUCTLIST_IN_CART } from '../../apis/graphqlQuery'
import { CartDashboardHeader } from './CartDashboardHeader'
import { CartDashboardBody } from './CartDashboardBody'
import { CartDashboardOrderButton } from './CartDashboardOrderButton'
import { NotFound } from './NotFound'

export type ProductInCart = {
  id: string
  quantity: number
  priceSum: number
  product: {
    id: string
    name: string
    price: number
    basePrice: number
    discountRate: number
    thumbnailSrc: string
  }
}

type ProductInCartData = {
  productListInCart: ProductInCart[]
}

type ProductInCartVars = { userId: number }

type Props = {} & RouteComponentProps

const StyledContainer = styled.div``

export const CartDashboard = (props: Props) => {
  const { loading, data, refetch } = useQuery<ProductInCartData, ProductInCartVars>(
    GET_PRODUCTLIST_IN_CART,
    { variables: { userId: 1 } }
  )

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
          <CartDashboardBody orderList={data.productListInCart} refetch={() => refetch()} />
          <CartDashboardOrderButton summary={getSummary()} />
        </StyledContainer>
      ) : (
        <NotFound />
      )}
    </Dashboard>
  )
}
