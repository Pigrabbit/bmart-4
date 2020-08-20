import React from 'react'
import styled from 'styled-components'
import { NAV_ICON_LIST } from '../../utils/constants'

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

const StyledIcon = styled.a`
  .navbar-item-icon {
    width: 34px;
    filter: invert(30%);
  }
`

export const Navbar = (props: Props) => {
  const iconList = NAV_ICON_LIST

  return (
    <StyledContainer className="navbar">
      {iconList.map((icon, idx) => (
        <StyledIcon
          key={idx}
          href=""
          className="navbar-item"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/navbar-icon/${icon}.svg`}
            alt={`${icon}-icon`}
            className="navbar-item-icon"
            id={`navbar-item-icon-${icon}`}
          />
        </StyledIcon>
      ))}
    </StyledContainer>
  )
}
