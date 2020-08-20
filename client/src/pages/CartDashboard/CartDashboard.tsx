import React from 'react'
import styled from 'styled-components'
import { RouteComponentProps } from 'react-router-dom'
import { Dashboard } from '../../components/Dashboard'

type Props = {} & RouteComponentProps

const StyledContainer = styled.div``

export const CartDashboard = (props: Props) => {
  return (
    <Dashboard title="">
      <StyledContainer></StyledContainer>
    </Dashboard>
  )
}
