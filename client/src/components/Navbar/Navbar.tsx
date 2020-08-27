import React, { useContext } from 'react'
import styled from 'styled-components'
import { NAVIGATIONS } from '../../utils/constants'
import { StyledLink } from '../../styles/StyledLink'
import { CartStateContext } from '../../context/CartContext'
import { COLORS } from '../../utils/styleConstants'
import { useRouteMatch } from 'react-router-dom'

type Props = {}

const StyledContainer = styled.nav`
  padding: 4px 16px 4px 16px;
  padding-bottom: calc(4px + env(safe-area-inset-bottom));
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
  position: relative;

  &.selected {
    color: ${COLORS.baemint};
  }

  .icon {
    font-size: 26px;
  }

  .display-name {
    text-align: center;
    font-size: 10px;
    margin-top: 2px;
  }

  .cart-count {
    position: absolute;
    left: calc(50% - 11px);
    top: 6px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: white;
    width: 19px;
    height: 19px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    .count {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      font-weight: 700;
      color: white;
      background-color: ${COLORS.red};

      p {
        line-height: 15px;
        text-align: center;
        width: 100%;
      }
    }
  }
`

export const Navbar = (props: Props) => {
  const iconList = NAVIGATIONS
  const match = useRouteMatch()

  const { count } = useContext(CartStateContext)

  return (
    <StyledContainer className="navbar">
      {iconList.map(({ name, displayName, path, icon, focusedIcon }, idx) => (
        <StyledLink key={idx} to={{ pathname: path }}>
          <StyledIcon className={`navbar-item ${match.path === path ? 'selected' : ''}`}>
            {name === 'cart' && count > 0 && (
              <div className="cart-count">
                <div className="count">
                  <p>{count}</p>
                </div>
              </div>
            )}
            <i className="icon">{match.path === path ? focusedIcon : icon}</i>
            <p className="display-name">{displayName}</p>
          </StyledIcon>
        </StyledLink>
      ))}
    </StyledContainer>
  )
}
