import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.footer``

export const Header = () => {
  return (
    <StyledContainer className="header" data-testid="header">
      <h1>B 마트</h1>
    </StyledContainer>
  )
}
