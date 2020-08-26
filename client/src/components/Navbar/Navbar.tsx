import React from 'react'
import styled from 'styled-components'
import { NAVIGATIONS } from '../../utils/constants'
import { StyledLink } from '../../styles/StyledLink'

type Props = {}

const StyledContainer = styled.nav`
  padding: 4px 16px 4px 16px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: calc(60px + env(safe-area-inset-bottom));
  z-index: 2000;
  background-color: white;
  border-top: 1px solid #ccc;
`

const StyledIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .navbar-item-icon {
    width: 30px;
    filter: invert(30%);
  }
  p {
    text-align: center;
    font-size: 10px;
    margin-top: 2px;
  }
`

export const Navbar = (props: Props) => {
  const iconList = NAVIGATIONS

  return (
    <StyledContainer className="navbar">
      {iconList.map(({ name, displayName, path }, idx) => (
        <StyledLink key={idx} to={{ pathname: path }}>
          <StyledIcon className="navbar-item">
            <img
              src={`${process.env.PUBLIC_URL}/images/navbar-icon/${name}.svg`}
              alt={`${name}-icon`}
              className="navbar-item-icon"
              id={`navbar-item-icon-${name}`}
            />
            <p>{displayName}</p>
          </StyledIcon>
        </StyledLink>
      ))}
    </StyledContainer>
  )
}
