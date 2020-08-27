import React, { useMemo, ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { STYLES, COLORS } from '../../utils/styleConstants'
import { CheckedProduct } from './CartDashboard'
import { Confirm } from '../../components/Confirm'
import { Checkbox } from '../../components/Checkbox'
import { DeleteProductFromCartVars } from '../../apis/cart'


type Props = {
  checkedProductList: CheckedProduct[]
  setCheckedProductList: (checkedProductList: CheckedProduct[]) => void
  deleteProductFromCartHandler: (variables: DeleteProductFromCartVars) => void
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
const StyledCheckboxLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .content {
    margin-left: 8px;
    font-size: 13.5px;
  }
`
const StyledVacateButton = styled.button`
  &:disabled {
    color: ${COLORS.disabled};
  }
`

export const CartDashboardHeader = (props: Props) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)
  const { checkedProductList } = props

  const allOrdersChecked = useMemo(() => {
    return checkedProductList.reduce((acc, cur) => {
      return acc + (cur.checked ? 1 : 0)
    }, 0)
  }, [checkedProductList])

  const clickToggleCheckButtonHandler = (checked: boolean) => {
    props.setCheckedProductList(checkedProductList.map((p) => ({ ...p, checked })))
  }

  const clickRemoveAllProductInCartHandler = () => {
    props.deleteProductFromCartHandler({
      orderProductIds: checkedProductList.filter((p) => p.checked).map((p) => p.productOrderId),
    })
  }

  return (
    <StyledContainer className="cart-dashboard-header">
      {isConfirmOpen && (
        <Confirm
          content="선택 항목을 모두 삭제하시겠습니까?"
          getResult={(result: boolean) => {
            if (result) {
              clickRemoveAllProductInCartHandler()
            }
            setIsConfirmOpen(false)
          }}
        />
      )}
      <StyledCheckboxLabel>
        <Checkbox
          checked={allOrdersChecked === checkedProductList.length}
          changeHandler={clickToggleCheckButtonHandler}
        />
        <div className="content">
          {allOrdersChecked === checkedProductList.length ? '선택해제' : '전체선택'}
        </div>
      </StyledCheckboxLabel>
      <StyledVacateButton disabled={allOrdersChecked === 0} onClick={() => setIsConfirmOpen(true)}>
        선택 비우기
      </StyledVacateButton>
    </StyledContainer>
  )
}
