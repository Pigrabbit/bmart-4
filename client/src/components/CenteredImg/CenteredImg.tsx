import React from 'react'
import styled from 'styled-components'

type Props = { src: string }

const StyledContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: calc(100vh - 50px);
  z-index: -100;
  background-color: white;
`

const StyledImage = styled.img`
  width: 70%;
  background-color: white;
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export const CenteredImg = (props: Props) => {
  const { src } = props
  return (
    <StyledContainer>
      <StyledImage src={`${process.env.PUBLIC_URL}/${src}`}></StyledImage>
    </StyledContainer>
  )
}
