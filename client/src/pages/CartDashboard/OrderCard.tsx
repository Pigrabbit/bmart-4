import React, { useEffect } from 'react'
import styled from 'styled-components'
import { parseToLocalMoneyString } from '../../utils/parser'
import { STYLES, COLORS } from '../../utils/styleConstants'

import { MAX_PRODUCT_PURCHASE_LIMIT, MIN_PRODUCT_PURCHASE_LIMIT } from '../../utils/constants'
import { StyledLink } from '../../styles/StyledLink'
import { Checkbox } from '../../components/Checkbox'
import { ProductInCart, ModifyProductQuantityVars, DeleteProductFromCartVars } from '../../apis/cart'

type Props = {
  order: ProductInCart
  checked: boolean
  toggleCheckboxHandler: () => void
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

    .product-name {
      margin-left: 8px;
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
  position: relative;
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
    width: 100%;

    .total-price {
      font-weight: 600;
      color: black;
      font-size: 14px;
    }

    .stock-count {
      height: 24px;
      padding-top: 10px;
      color: ${COLORS.red};
    }
  }
`
const StyledController = styled.div`
  height: 30px;
  width: 92px;
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

    &:disabled {
      color: ${COLORS.disabled};
    }
  }
  .count {
    font-weight: 600;
    line-height: 30px;
    width: 30px;
    text-align: center;
  }
`

export const OrderCard = (props: Props) => {
  const { order, checked } = props
  const { id, quantity, priceSum, product } = order

  const modifyProductQuantity = (quantity: number) => {
    if (quantity <= MIN_PRODUCT_PURCHASE_LIMIT - 1 || quantity >= MAX_PRODUCT_PURCHASE_LIMIT + 1)
      return

    props.modifyProductQuantityHandler({
      productId: product.id,
      orderProductId: id,
      quantity,
    })
  }

  useEffect(() => {
    if (product.stockCount < quantity) {
      props.modifyProductQuantityHandler({
        productId: product.id,
        orderProductId: id,
        quantity: product.stockCount,
      })
    }
  }, [])

  const price = `(${parseToLocalMoneyString(product.price)}원)`
  const totalPrice = `${parseToLocalMoneyString(priceSum)}원`
  const soldOut = product.stockCount === 0
  const invalidateQuantity = product.stockCount < quantity

  return (
    <StyledContainer className="order-card">
      <StyledTitle>
        <label className="check">
          <Checkbox
            checked={checked && !soldOut && !invalidateQuantity}
            disabled={soldOut || invalidateQuantity}
            changeHandler={() => props.toggleCheckboxHandler()}
          />
          <h3 className="product-name">{product.name}</h3>
        </label>
        <button
          className="remove-btn"
          onClick={() => props.deleteProductFromCartHandler({ orderProductIds: [id] })}
        >
          삭제
        </button>
      </StyledTitle>
      <StyledLink
        to={{
          pathname: `/product/${product.id}`,
          state: {
            ...product,
          },
        }}
      >
        <StyledProductCard>
          <div className="thumbnail">
            <img src={product.thumbnailSrc} alt="" />
          </div>
          <div className="content">
            <div className="description">
              <div className="price">{price}</div>
              <div className="total-price">{totalPrice}</div>
              {product.stockCount < MAX_PRODUCT_PURCHASE_LIMIT && (
                <div className="stock-count">
                  {soldOut
                    ? '재고가 없어 주문하실 수 없습니다.'
                    : `상품이 ${product.stockCount}개 남았습니다.`}
                </div>
              )}
            </div>
            <StyledController className="quantity">
              <button
                className="decrement control-btn"
                disabled={quantity <= MIN_PRODUCT_PURCHASE_LIMIT}
                onClick={(e) => {
                  e.preventDefault()
                  modifyProductQuantity(quantity - 1)
                }}
              >
                -
              </button>
              <div className="count">{quantity}</div>
              <button
                className="increment control-btn"
                disabled={quantity >= MAX_PRODUCT_PURCHASE_LIMIT || product.stockCount <= quantity}
                onClick={(e) => {
                  e.preventDefault()
                  modifyProductQuantity(quantity + 1)
                }}
              >
                +
              </button>
            </StyledController>
          </div>
        </StyledProductCard>
      </StyledLink>
    </StyledContainer>
  )
}
