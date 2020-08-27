import React, { useReducer, Dispatch, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_PRODUCT_COUNT_IN_CART, GetProuctCountInCartData } from '../apis/graphqlQuery'

type CartStateType = {
  count: number
}

type CartActionType = {
  type: 'addProduct' | 'removeProduct' | 'removeAllProduct'
  payload: CartStateType
}

const defaultCartValue: CartStateType = { count: 0 }

export const CartStateContext = React.createContext<CartStateType>(defaultCartValue)
export const CartDispatchContext = React.createContext<Dispatch<CartActionType>>(() => {})

const cartReducer = (state: CartStateType, action: CartActionType): CartStateType => {
  switch (action.type) {
    case 'addProduct':
      return { ...state, count: state.count + action.payload.count }
    case 'removeProduct':
      return { ...state, count: state.count + action.payload.count }
    case 'removeAllProduct':
      return { ...state, count: 0 }
  }
}

type Props = {
  children: React.ReactChild
}

export const CartProvider = (props: Props) => {
  const { children } = props
  const { loading, data } = useQuery<GetProuctCountInCartData>(GET_PRODUCT_COUNT_IN_CART)

  const [state, dispatch] = useReducer(cartReducer, defaultCartValue)

  useEffect(() => {
    if (typeof data?.productCountInCart === 'number') {
      dispatch({ type: 'addProduct', payload: { count: data.productCountInCart } })
    }
  }, [loading])

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}
