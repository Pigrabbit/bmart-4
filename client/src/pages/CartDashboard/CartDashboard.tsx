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
import { STYLES } from '../../utils/styleConstants'

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
const StyledFooter = styled.div`
  padding: 10px ${STYLES.padding};

  p {
    padding: 10px 0;
  }
`

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
          <CartDashboardBody orderList={data.productListInCart} refetch={refetch} />
          <StyledFooter className="policy">
            <p>배달팁 할인 이벤트는 내부사정으로 사전 예고 없이 조기 종료 될 수 있습니다.</p>
            <p>
              장바구니에 담긴 상품은 최대 7일 동안 저장됩니다. 판매 종료 상품은 장바구니에서
              자동으로 삭제됩니다.
            </p>
          </StyledFooter>
          <CartDashboardOrderButton summary={getSummary()} />
        </StyledContainer>
      ) : (
        <NotFound />
      )}
    </Dashboard>
  )
}
