import React, { useEffect, useState, useContext } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'
import { OAUTH_URI } from '../../utils/constants'
import { AuthStateContext, AuthDispatchContext } from '../../context/AuthContext'
import { Header } from '../../components/Header'

type Props = {} & RouteComponentProps

const StyledContainer = styled.div`
  margin: auto;
  width: 100%;
`

const StyledDashboard = styled.div`
  width: 100vw;
  height: 100vh;
  /* background: linear-gradient(275.27deg, #349ca3 0%, #61e7cf 100%); */
`

const StyledImg = styled.img`
  margin-left: auto;
  margin-right: auto;
  display: block;
  position: relative;
  z-index: 2;
`

const StyledLoginButton = styled.img`
  margin: auto;
  display: block;
  transform: translateY(-17px);
  z-index: 1;
  position: relative;
`

const StyledLogo = styled.img`
  margin: 50px auto;
  position: relative;
`

const StyledLink = styled.a`
  width: 100%;
  margin: auto;
  display: block;
  position: relative;
`

const StyledTitle = styled.div`
  font-size: 50px;
  margin: auto;
  text-align: center;
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
    <StyledDashboard>
      <StyledContainer>
        {isAuthenticated ? (
          <Redirect to={{ pathname: '/' }} />
        ) : (
          <StyledLink href={OAUTH_URI}>
            <StyledImg
              className="google-login-btn"
              src={`${process.env.PUBLIC_URL}/images/pre.png`}
              width="120"
            />
            <StyledLoginButton
              className="google-login-btn"
              src={`${process.env.PUBLIC_URL}/images/signin.png`}
              width="250"
            />
          </StyledLink>
        )}
      </StyledContainer>
    </StyledDashboard>
  )
}
