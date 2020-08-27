import React from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { ProductInCart } from '../../apis/cart'
import { StyledLink } from '../../styles/StyledLink'

type Props = {
  productId: string
  cartProduct: ProductInCart
}

const StyledContainer = styled.div`
  padding: 8px 12px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;

  .history-detail-item-name {
    width: 100%;
  }

  .description {
    display: flex;

    .history-detail-item-price {
      width: 100px;
      text-align: center;
      flex: 0 0 auto;
      font-weight: 700;
    }

    .history-detail-item-quantity {
      width: 40px;
      text-align: center;
      flex: 0 0 auto;
    }
  }
`

export const HistoryCardDetail = (props: Props) => {
  const { cartProduct, productId } = props
  const { name, price } = cartProduct.product
  return (
    <StyledContainer className="history-detail-item">
      <StyledLink to={`/product/${productId}`}>
        <p className="history-detail-item-name">{name}</p>
      </StyledLink>
      <div className="description">
        <p className="history-detail-item-price">{parseToLocalMoneyString(price)}원</p>
        <p className="history-detail-item-quantity">{cartProduct.quantity}개</p>
      </div>
    </StyledContainer>
  )
}
