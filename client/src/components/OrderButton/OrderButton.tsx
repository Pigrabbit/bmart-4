import React from 'react'
import styled from 'styled-components'
import { STYLES, COLORS } from '../../utils/styleConstants'

type Props = {
  children: React.ReactElement
  disabled?: boolean
  clickHandler: () => void
}

const StyledContainer = styled.div`
  height: 60px;
  width: 100%;
  background-color: transparent;
`
const StyledButtonWrap = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 10px 10px 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`
const StyledOrderButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: ${STYLES.smallRadius};
  color: white;
  background-color: ${COLORS.baemint};
  font-size: 16px;
  font-weight: 700;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);

  &:disabled {
    background-color: ${COLORS.disabled};
  }
`

export const OrderButton = (props: Props) => {
  const { children, disabled = false } = props
  return (
    <StyledContainer className="cart-dashboard-submit">
      <StyledButtonWrap>
        <StyledOrderButton onClick={props.clickHandler} disabled={disabled}>
          {children}
        </StyledOrderButton>
      </StyledButtonWrap>
    </StyledContainer>
  )
}
