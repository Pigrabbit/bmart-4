import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthStateContext } from '../context/AuthContext'

type Props = {
  component: React.FunctionComponent
  path: string
  rest?: any
}

export const PrivateRoute = ({ component: Component, path, ...rest }: Props) => {
  const { isAuthenticated } = useContext(AuthStateContext)
  
  return (
    <Route
      {...rest}
      path={path}
      component={() => (isAuthenticated ? <Component /> : <Redirect to={{ pathname: '/login' }} />)}
    />
  )
}
