import React, { useMemo, ChangeEvent, useState } from 'react'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'
import { CheckedProduct } from './CartDashboard'
import { DeleteProductFromCartVars } from '../../apis/graphqlQuery'
import { Confirm } from '../../components/Confirm'

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
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)
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
      <StyledCheckbox>
        <input
          type="checkbox"
          checked={allOrdersChecked}
          onChange={clickToggleCheckButtonHandler}
        />
        선택해제
      </StyledCheckbox>
      <StyledVacateButton onClick={() => setIsConfirmOpen(true)}>선택 비우기</StyledVacateButton>
    </StyledContainer>
  )
}
