import React from 'react'
import styled from 'styled-components'

type Props = {}

const Dashboard = styled.main`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
`

export const MainDashboard = (props: Props) => {
  return <Dashboard className="dashboard"></Dashboard>
}
