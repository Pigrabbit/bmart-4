import React, { useEffect, useState, useContext } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'
import { OAUTH_URI } from '../../utils/constants'
import { AuthStateContext, AuthDispatchContext } from '../../context/AuthContext'

type Props = {} & RouteComponentProps

const StyledContainer = styled.div`
  padding: ${STYLES.padding};
`

export const LoginDashboard = (props: Props) => {
  const { isAuthenticated } = useContext(AuthStateContext)
  const dispatch = useContext(AuthDispatchContext)

  useEffect(() => {
    if (!document.cookie.includes('token')) {
      return
    }
    const tokenLoc = document.cookie.indexOf('token')
    let endLoc = Math.min(document.cookie.length, document.cookie.indexOf(';', tokenLoc))
    if (endLoc === -1) {
      endLoc = document.cookie.length
    }
    const token = document.cookie.substring(tokenLoc, endLoc + 1)
    if (!token) return
    localStorage.setItem('token', token.split('=')[1])
    document.cookie = `token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`
    dispatch({ type: 'signIn', payload: { isAuthenticated: true } })
  }, [])

  return (
    <StyledContainer>
      {isAuthenticated ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
        <a href={OAUTH_URI}>
          <button className="google-login-btn">Sign In with Google</button>
        </a>
      )}
    </StyledContainer>
  )
}
