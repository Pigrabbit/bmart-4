import React from 'react'
import styled from 'styled-components'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { Navbar } from '../Navbar'

type Props = {
  title: string
  children: React.ReactElement
}

const StyledContainer = styled.div``

export const Dashboard = (props: Props) => {
  const { title } = props

  return (
    <StyledContainer>
      <Header title={title}></Header>
      {props.children}
      <Footer></Footer>
      <Navbar />
    </StyledContainer>
  )
}
