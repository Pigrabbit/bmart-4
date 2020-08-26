import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthStateContext } from '../context/AuthContext'

type Props = {
  component: React.FunctionComponent
  path: string
  exact?: boolean
  rest?: any
}

export const PrivateRoute = ({ component: Component, path, exact = false, ...rest }: Props) => {
  const { isAuthenticated } = useContext(AuthStateContext)

  return exact ? (
    <Route
      {...rest}
      exact
      path={path}
      component={() => (isAuthenticated ? <Component /> : <Redirect to={{ pathname: '/login' }} />)}
    />
  ) : (
    <Route
      {...rest}
      path={path}
      component={() => (isAuthenticated ? <Component /> : <Redirect to={{ pathname: '/login' }} />)}
    />
  )
}
