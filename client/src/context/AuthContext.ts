import React from 'react'

type AuthType = {
  isAuthenticated: boolean
  userName?: string
}

enum AuthActionType {
  'signIn',
  'signOut',
}

type ActionType = (params: { type: AuthActionType; payload: AuthType }) => void

const defaultAuthValue = { isAuthenticated: false }

export const AuthContext = React.createContext<AuthType>(defaultAuthValue)
export const AuthProvider = AuthContext.Provider

const authReducer = (state: AuthType, action: ActionType) => {}
