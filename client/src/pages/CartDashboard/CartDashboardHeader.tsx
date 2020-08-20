import React, { useMemo, ChangeEvent } from 'react'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'
import { CheckedProduct } from './CartDashboard'

type Props = {
  checkedProductList: CheckedProduct[]
  setCheckedProductList: (checkedProductList: CheckedProduct[]) => void
}

const StyledContainer = styled.div`
  position: sticky;
  margin-top: -1px;
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
  const { checkedProductList } = props

  const allOrdersChecked = useMemo(() => {
    return checkedProductList.reduce((acc, cur) => {
      return acc && cur.checked
    }, true)
  }, [checkedProductList])

  const clickToggleCheckButtonHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    props.setCheckedProductList(checkedProductList.map((p) => ({ ...p, checked })))
  }

  return (
    <StyledContainer className="cart-dashboard-header">
      <StyledCheckbox>
        <input
          type="checkbox"
          checked={allOrdersChecked}
          onChange={clickToggleCheckButtonHandler}
        />
        선택해제
      </StyledCheckbox>
      <StyledVacateButton>선택 비우기</StyledVacateButton>
    </StyledContainer>
  )
}
