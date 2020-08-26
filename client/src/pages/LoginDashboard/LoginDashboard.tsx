import React, { useEffect, useContext } from 'react'
import { RouteComponentProps, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { OAUTH_URI } from '../../utils/constants'
import { AuthStateContext, AuthDispatchContext } from '../../context/AuthContext'
import {
  parseCookieToJson,
  clearCookie,
  saveJsonToLocalStorage,
  decodeToken,
} from '../../utils/storageHandler'

type Props = {} & RouteComponentProps

const StyledBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: white;
`

const StyledContainer = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledRider = styled.img`
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 50% 0 20% 0%;
`

const StyledLoginButton = styled.img`
  display: block;
  position: relative;
`

const StyledLogo = styled.img`
  margin: auto;
  width: 50%;
`
const StyledLink = styled.a`
  margin: auto;
  display: block;
`

export const LoginDashboard = (props: Props) => {
  const { isAuthenticated } = useContext(AuthStateContext)
  const dispatch = useContext(AuthDispatchContext)

  useEffect(() => {
    if (document.cookie) {
      let cookieJson = parseCookieToJson(document.cookie)
      clearCookie()

      let decodedToken = decodeToken(cookieJson['token'])
      cookieJson['firstname'] = decodedToken['firstname']
      cookieJson['lastname'] = decodedToken['lastname']
      saveJsonToLocalStorage(cookieJson)

      dispatch({ type: 'signIn', payload: { isAuthenticated: true } })
    }
  }, [])

  return (
    <StyledBackground>
      <StyledContainer>
        <StyledLogo
          className="google-login-btn"
          src={`${process.env.PUBLIC_URL}/images/bmart-title.png`}
          width="150px"
        />
        <StyledRider
          className="bmart-rider"
          src={`${process.env.PUBLIC_URL}/images/bmart_rider.png`}
        />
        {isAuthenticated ? (
          <Redirect to={{ pathname: '/' }} />
        ) : (
          <StyledLink href={OAUTH_URI}>
            <StyledLoginButton
              className="google-login-btn"
              src={`${process.env.PUBLIC_URL}/images/signin.png`}
              width="250"
            />
          </StyledLink>
        )}
      </StyledContainer>
    </StyledBackground>
  )
}
