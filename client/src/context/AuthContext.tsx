import React, { useReducer, Dispatch } from 'react'

type AuthStateType = {
  isAuthenticated: boolean
}

type AuthActionType = { type: 'signIn' | 'signOut'; payload: AuthStateType }

const defaultAuthValue: AuthStateType = {
  isAuthenticated: localStorage.getItem('token') ? true : false,
}

export const AuthStateContext = React.createContext<AuthStateType>(defaultAuthValue)
export const AuthDispatchContext = React.createContext<Dispatch<AuthActionType>>(() => {})

const authReducer = (state: AuthStateType, action: AuthActionType): AuthStateType => {
  switch (action.type) {
    case 'signIn':
      return { ...state, isAuthenticated: action.payload.isAuthenticated }
    case 'signOut':
      return { ...state, isAuthenticated: action.payload.isAuthenticated }
  }
}

type Props = {
  children: React.ReactChild
}

export const AuthProvider = (props: Props) => {
  const { children } = props
  const [state, dispatch] = useReducer(authReducer, defaultAuthValue)

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>{children}</AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}
