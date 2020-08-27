import React from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { ProductInCart } from '../../apis/cart'

type Props = {
  cartProduct: ProductInCart
}

const StyledContainer = styled.div`
  padding: 5px;
  display: grid;
  grid-template-columns: 8fr 2fr 2fr;
  align-items: center;

  .history-detail-item-price,
  .history-detail-item-quantity {
    justify-self: center;
  }
`

export const HistoryCardDetail = (props: Props) => {
  const { cartProduct } = props
  const { name, price } = cartProduct.product
  return (
    <StyledContainer className="history-detail-item">
      <p className="history-detail-item-name">{name}</p>
      <p className="history-detail-item-price">{parseToLocalMoneyString(price)}원</p>
      <p className="history-detail-item-quantity">{cartProduct.quantity}개</p>
    </StyledContainer>
  )
}
