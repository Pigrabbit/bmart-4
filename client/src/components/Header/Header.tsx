import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.header`
  display: flex;
  padding: 20px;
`

const StyledImage = styled.img`
  width: 40px;
  height: 40px;
`

const StyledTitle = styled.h1`
  margin: auto auto auto 0;
`

const StyledOptions = styled.div`
  display: flex;
`

const StyledButton = styled.button`
  padding: 10px;
  margin: auto 0 auto 10px;
`

export const Header = () => {
  return (
    <StyledContainer className="header" data-testid="header">
      <StyledImage src={`${process.env.PUBLIC_URL}/images/bmart-logo.png`} alt="" />
      <StyledTitle>마트</StyledTitle>
      <StyledOptions>
        <StyledButton>검색</StyledButton>
        <StyledButton>옵션</StyledButton>
      </StyledOptions>
    </StyledContainer>
  )
}
