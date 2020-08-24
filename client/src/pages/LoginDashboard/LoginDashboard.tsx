import React from 'react'
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
      <button className='google-login-btn'>
        Sign In with Google
      </button>
    </StyledContainer>
    )
}
