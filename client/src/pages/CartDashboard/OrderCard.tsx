import React from 'react'
import styled from 'styled-components'
import { ProductInCart } from './CartDashboard'
import { parseToLocalMoneyString } from '../../utils/parser'
import { STYLES, COLORS } from '../../utils/styleConstants'
import { useMutation } from '@apollo/client'
import { MODIFY_PRODUCT_QUANTITY, DELETE_PRODUCT_FROM_CART } from '../../apis/graphqlQuery'

type Props = {
  order: ProductInCart
  refetch: () => void
}

const StyledContainer = styled.div`
  padding: 20px 0 0 0;
  position: relative;

  &:last-child {
    padding-bottom: 10px;

    &::after {
      bottom: 10px;
    }
  }

  &::after {
    content: '';
    display: block;
    height: 1px;
    background-color: #ddd;
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;
  }
`
const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .check {
    display: flex;
    align-items: center;
    overflow-x: hidden;
    padding-right: 8px;

    .checkbox {
      margin-right: 8px;
      width: 19px;
      height: 19px;
    }

    .product-name {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }

  .remove-btn {
    width: 40px;
    flex: 0 0 auto;
    font-size: 14px;
    color: ${COLORS.baemint};
  }
`
const StyledProductCard = styled.div`
  display: flex;
  padding: ${STYLES.padding} 0;

  .thumbnail {
    margin-right: 10px;

    img {
      width: 100px;
      height: 100px;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .total-price {
      font-weight: 600;
      color: black;
      font-size: 14px;
    }
  }
`
const StyledController = styled.div`
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 20px;

  .control-btn {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
  }
  .decrement {
    color: #888;
  }
  .count {
    font-weight: 600;
    line-height: 30px;
    width: 30px;
    text-align: center;
  }
`

export const OrderCard = (props: Props) => {
  const { id, quantity, priceSum, product } = props.order
  const [modifyProductQuantity] = useMutation(MODIFY_PRODUCT_QUANTITY, {
    onCompleted: props.refetch,
  })

  const [deleteProductFromCart] = useMutation(DELETE_PRODUCT_FROM_CART, {
    onCompleted: props.refetch,
  })

  const modifyProductQuantityHandler = (quantity: number) => {
    modifyProductQuantity({ variables: { productId: product.id, orderProductId: id, quantity } })
  }

  const deleteProductFromCartHandler = (orderProductId: string) => {
    deleteProductFromCart({ variables: { orderProductId } })
  }

  return (
    <StyledContainer className="order-card">
      <StyledTitle>
        <label className="check">
          <input type="checkbox" className="checkbox" />
          <h3 className="product-name">{product.name}</h3>
        </label>
        <button className="remove-btn" onClick={() => deleteProductFromCartHandler(id)}>
          삭제
        </button>
      </StyledTitle>
      <StyledProductCard>
        <div className="thumbnail">
          <img src={`http://${product.thumbnailSrc}`} alt="" />
        </div>
        <div className="content">
          <div className="description">
            <div className="price">{`(${parseToLocalMoneyString(product.price)}원)`}</div>
            <div className="total-price">{parseToLocalMoneyString(product.price * quantity)}원</div>
          </div>
          <StyledController className="quantity">
            <button
              className="decrement control-btn"
              onClick={() => modifyProductQuantityHandler(quantity - 1)}
            >
              -
            </button>
            <div className="count">{quantity}</div>
            <button
              className="increment control-btn"
              onClick={() => modifyProductQuantityHandler(quantity + 1)}
            >
              +
            </button>
          </StyledController>
        </div>
      </StyledProductCard>
    </StyledContainer>
  )
}
