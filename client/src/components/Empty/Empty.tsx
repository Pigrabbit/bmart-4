import React from 'react'
import styled from 'styled-components'

type Props = { src: string }

const StyledImage = styled.img`
  height: calc(100vh - 50px);
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
  background-color: white;
`

export const Empty = (props: Props) => {
  const { src } = props
  return <StyledImage src={`${process.env.PUBLIC_URL}/${src}`}></StyledImage>
}
