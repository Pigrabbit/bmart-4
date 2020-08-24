import React from 'react'
import styled from 'styled-components'
import { NAVIGATIONS } from '../../utils/constants'
import { StyledLink } from '../../styles/StyledLink'

type Props = {}

const StyledContainer = styled.nav`
  padding: 4px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  z-index: 100;
  background-color: white;
  border-top: 1px solid #ddd;
`

const StyledIcon = styled.div`
  .navbar-item-icon {
    width: 34px;
    filter: invert(30%);
  }
`

export const Navbar = (props: Props) => {
  const iconList = NAVIGATIONS

  return (
    <StyledContainer className="navbar">
      {iconList.map(({ name, path }, idx) => (
        <StyledLink key={idx} to={{ pathname: path }}>
          <StyledIcon className="navbar-item">
            <img
              src={`${process.env.PUBLIC_URL}/images/navbar-icon/${name}.svg`}
              alt={`${name}-icon`}
              className="navbar-item-icon"
              id={`navbar-item-icon-${name}`}
            />
          </StyledIcon>
        </StyledLink>
      ))}
    </StyledContainer>
  )
}
