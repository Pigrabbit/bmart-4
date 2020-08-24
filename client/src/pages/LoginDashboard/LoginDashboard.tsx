import React, { MouseEvent, useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'

type Props = {} & RouteComponentProps

const StyledContainer = styled.div`
  padding: ${STYLES.padding};
`

export const LoginDashboard = (props: Props) => {
  return (
    <StyledContainer>
      <a className="google-login-btn" href="http://localhost:4000/auth/google">
        Sign In with Google
      </a>
    </StyledContainer>
  )
}
