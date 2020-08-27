import React, { useReducer, Dispatch, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GetProuctCountInCartData, GET_PRODUCT_IDS_IN_CART } from '../apis/cart'

type CartStateType = {
  count: number
  productIdList: string[]
}

type CartActionType = {
  type: 'addProduct' | 'removeProduct'
  payload: Pick<CartStateType, 'productIdList'>
}

const defaultCartValue: CartStateType = { count: 0, productIdList: [] }

export const CartStateContext = React.createContext<CartStateType>(defaultCartValue)
export const CartDispatchContext = React.createContext<Dispatch<CartActionType>>(() => {})

const cartReducer = (state: CartStateType, action: CartActionType): CartStateType => {
  switch (action.type) {
    case 'addProduct': {
      const productIdList = [...state.productIdList]

      action.payload.productIdList.map((id) => {
        if (state.productIdList.indexOf(id) < 0) productIdList.push(id)
      })

      return { ...state, productIdList, count: productIdList.length }
    }
    case 'removeProduct': {
      const productIdList: string[] = []

      state.productIdList.map((productId) => {
        if (action.payload.productIdList.indexOf(productId) >= 0) return
        else return productIdList.push(productId)
      }, [] as string[])

      return { ...state, productIdList, count: productIdList.length }
    }
    default:
      return state
  }
}

type Props = {
  children: React.ReactChild
}

export const CartProvider = (props: Props) => {
  const { children } = props
  const { loading, data, refetch } = useQuery<GetProuctCountInCartData>(GET_PRODUCT_IDS_IN_CART)

  const [state, dispatch] = useReducer(cartReducer, defaultCartValue)

  useEffect(() => {
    if (data && data.productIdsInCart) {
      dispatch({ type: 'addProduct', payload: { productIdList: data.productIdsInCart } })
    }
  }, [loading])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}
