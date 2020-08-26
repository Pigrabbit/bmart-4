import React from 'react'
import styled from 'styled-components'

type Props = {}

const StyledContainer = styled.div`
  background-image: url("${process.env.PUBLIC_URL}/images/cart-tung.png");
  height: calc(100vh - 50px);
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  background-color: white;
`

export const NotFound = (props: Props) => {
  return <StyledContainer></StyledContainer>
}
