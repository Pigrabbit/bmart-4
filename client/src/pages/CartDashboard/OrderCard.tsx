import React from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { STYLES, COLORS } from '../../utils/styleConstants'
import {
  ModifyProductQuantityVars,
  DeleteProductFromCartVars,
  ProductInCart,
} from '../../apis/graphqlQuery'

type Props = {
  order: ProductInCart
  modifyProductQuantityHandler: (variables: ModifyProductQuantityVars) => void
  deleteProductFromCartHandler: (variables: DeleteProductFromCartVars) => void
}

const StyledContainer = styled.div`
  padding: 20px 0 0 0;
  position: relative;

  &:last-child {
    &::after {
      display: none;
    }
  }

  &::after {
    content: '';
    display: block;
    height: 1px;
    background-color: #ddd;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
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

  const modifyProductQuantity = (quantity: number) => {
    props.modifyProductQuantityHandler({
      productId: product.id,
      orderProductId: id,
      quantity,
    })
  }

  const price = `(${parseToLocalMoneyString(product.price)}원)`
  const totalPrice = `${parseToLocalMoneyString(priceSum)}원`

  return (
    <StyledContainer className="order-card">
      <StyledTitle>
        <label className="check">
          <input type="checkbox" className="checkbox" />
          <h3 className="product-name">{product.name}</h3>
        </label>
        <button
          className="remove-btn"
          onClick={() => props.deleteProductFromCartHandler({ orderProductId: id })}
        >
          삭제
        </button>
      </StyledTitle>
      <StyledProductCard>
        <div className="thumbnail">
          <img src={`http://${product.thumbnailSrc}`} alt="" />
        </div>
        <div className="content">
          <div className="description">
            <div className="price">{price}</div>
            <div className="total-price">{totalPrice}</div>
          </div>
          <StyledController className="quantity">
            <button
              className="decrement control-btn"
              onClick={() => modifyProductQuantity(quantity - 1)}
            >
              -
            </button>
            <div className="count">{quantity}</div>
            <button
              className="increment control-btn"
              onClick={() => modifyProductQuantity(quantity + 1)}
            >
              +
            </button>
          </StyledController>
        </div>
      </StyledProductCard>
    </StyledContainer>
  )
}
