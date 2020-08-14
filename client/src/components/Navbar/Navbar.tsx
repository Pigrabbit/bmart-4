import React from 'react'
import styled from 'styled-components';

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
    z-index: 10;
    background-color: #f0f1f3;
    border-top: 1px solid #808080;
`;

const StyledIcon = styled.a`
    .navbar-item-icon {
        width: 10vw;
        filter: invert(30%);
    }
`

export const Navbar = (props: Props) => {
  return (
    <StyledContainer className="navbar">
      <StyledIcon href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/home.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </StyledIcon>
      <StyledIcon href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/search.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </StyledIcon>
      <StyledIcon href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/favorite.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </StyledIcon>
      <StyledIcon href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/history.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </StyledIcon>
      <StyledIcon href="" className="navbar-item" target="_blank" rel="noopener noreferrer">
        <img
          src={`${process.env.PUBLIC_URL}/images/navbar-icon/shopping_cart.svg`}
          alt=""
          className="navbar-item-icon"
        />
      </StyledIcon>
    </StyledContainer>
  )
}
