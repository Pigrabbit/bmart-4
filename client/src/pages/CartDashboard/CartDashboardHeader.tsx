import React from 'react'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'

type Props = {}

const StyledContainer = styled.div`
  position: sticky;
  top: 49px;
  width: 100%;
  height: 40px;
  background: white;
  z-index: 1000;
  border-bottom: 1px solid #ddd;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${STYLES.padding};
`
const StyledCheckbox = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & input {
    margin-right: 8px;
    width: 19px;
    height: 19px;
  }
`
const StyledVacateButton = styled.button``

export const CartDashboardHeader = (props: Props) => {
  return (
    <StyledContainer className="cart-dashboard-header">
      <StyledCheckbox>
        <input type="checkbox" />
        선택해제
      </StyledCheckbox>
      <StyledVacateButton>선택 비우기</StyledVacateButton>
    </StyledContainer>
  )
}
