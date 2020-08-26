import React, { useRef, MouseEvent, useReducer, useEffect } from 'react'
import styled from 'styled-components'
import { MAX_PRODUCT_PURCHASE_LIMIT, MIN_PRODUCT_PURCHASE_LIMIT } from '../../utils/constants'
import { useMutation } from '@apollo/client'
import { ADD_PRODUCT_TO_CART, AddProductToCartVars } from '../../apis/graphqlQuery'
import { parseToLocalMoneyString } from '../../utils/parser'
import { OrderButton } from '../OrderButton'
import { COLORS } from '../../utils/styleConstants'

type Props = {
  id: string
  name: string
  price: number
  stockCount: number
  thumbnailSrc: string
  savedCount: number
  setSavedCount: (count: number) => void
  setIsModalVisible: (flag: boolean) => void
  setIsOrderPlaced: (flag: boolean) => void
}

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;

  .order-modal-overlay {
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
    position: absolute;
  }

  @keyframes slideUpModal {
    0% {
      transform: translateY(400px);
    }
    100% {
      transform: translateY(0);
    }
  }
`

const StyledModalContent = styled.div`
  position: absolute;
  bottom: 0;
  padding: 16px;

  width: 100%;
  height: 40%;
  background-color: white;
  border-radius: 20px 20px 0 0;
  animation: 0.3s ease-in slideUpModal;

  display: grid;
  grid-template-columns: 3fr 6fr 3fr;
  grid-template-rows: 40% 40%;
  justify-items: stretch;
  align-items: center;

  .order-modal-content-thumbnail {
    width: 100%;
    border-radius: 6px;
  }

  .order-modal-content-data {
    margin: 0 15px;
    p {
      font-size: 12px;
    }
    .order-modal-content-name {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .order-modal-content-price {
      font-weight: 700;
      font-size: 16px;
    }
    .stock-count {
      height: 24px;
      padding-top: 10px;
      color: ${COLORS.red};
    }
  }
`
const StyledModalError = styled.p`
  grid-column: 1/13;
  align-self: start;
  color: ${COLORS.red};
  font-size: 12px;
  text-align: center;
`

const StyledController = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30%;
  border-radius: 20px;
  border: 1px solid #aaa;
  font-size: 16px;

  button {
    width: 100%;
    height: 100%;

    &:disabled {
      color: #ccc;
    }
  }
`

type State = {
  count: number
  error: string
  isErrorVisible: boolean
}

type Action = {
  type: string
}

const modalReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'increment': {
      return state.count >= MAX_PRODUCT_PURCHASE_LIMIT
        ? {
            ...state,
            error: `최대 ${MAX_PRODUCT_PURCHASE_LIMIT}개 까지 구매 가능합니다`,
            isErrorVisible: true,
          }
        : {
            ...state,
            isErrorVisible: false,
            count: state.count + 1,
          }
    }
    case 'decrement': {
      return state.count <= MIN_PRODUCT_PURCHASE_LIMIT
        ? {
            ...state,
            error: '최소 구매 수량입니다',
            isErrorVisible: true,
          }
        : {
            ...state,
            isErrorVisible: false,
            count: state.count - 1,
          }
    }
    default:
      break
  }
  return state
}

export const OrderModal = (props: Props) => {
  const { id, name, price, thumbnailSrc, savedCount, stockCount } = props

  const initialState: State = {
    count: savedCount,
    error: '',
    isErrorVisible: false,
  }
  const [state, dispatch] = useReducer(modalReducer, initialState)
  const modalOverlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    props.setSavedCount(state.count)
  }, [state.count])

  const [addProductToCart] = useMutation<{}, AddProductToCartVars>(ADD_PRODUCT_TO_CART)

  const clickOutsideModalHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.target === modalOverlayRef.current) props.setIsModalVisible(false)
  }

  const clickOrderButtonHandler = () => {
    addProductToCart({
      variables: { productId: id, quantity: state.count },
    })
    props.setIsModalVisible(false)
    props.setIsOrderPlaced(true)
    props.setSavedCount(1)
  }

  return (
    <StyledContainer className="order-modal" onClick={clickOutsideModalHandler}>
      <div className="order-modal-overlay" ref={modalOverlayRef} />
      <StyledModalContent className="order-modal-content">
        <img
          className="order-modal-content-thumbnail"
          src={thumbnailSrc}
          alt={`order-modal-thumbnail-${id}`}
        />
        <div className="order-modal-content-data">
          <p className="order-modal-content-name">{name}</p>
          <p className="order-modal-content-price">{parseToLocalMoneyString(price)}원</p>
          {stockCount <= MAX_PRODUCT_PURCHASE_LIMIT && (
            <p className="stock-count">{`상품이 ${stockCount}개 남았습니다.`}</p>
          )}
        </div>
        <StyledController className="order-modal-controller">
          <button
            className="order-modal-controller-decrement-btn"
            disabled={state.count <= MIN_PRODUCT_PURCHASE_LIMIT}
            onClick={() => dispatch({ type: 'decrement' })}
          >
            -
          </button>
          <p className="order-modal-controller-quantity">{state.count}</p>
          <button
            className="order-modal-controller-increment-btn"
            disabled={state.count >= MAX_PRODUCT_PURCHASE_LIMIT || state.count >= stockCount}
            onClick={() => dispatch({ type: 'increment' })}
          >
            +
          </button>
        </StyledController>
        {state.isErrorVisible ? <StyledModalError>{state.error}</StyledModalError> : ''}
        <OrderButton clickHandler={clickOrderButtonHandler}>
          <>장바구니에 담기</>
        </OrderButton>
      </StyledModalContent>
    </StyledContainer>
  )
}
