import React, {
  useRef,
  MouseEvent,
  useState,
  useEffect,
  useReducer,
  ReducerWithoutAction,
} from 'react'
import styled from 'styled-components'
import { MAX_PRODUCT_PURCHASE_LIMIT, MIN_PRODUCT_PURCHASE_LIMIT } from '../../utils/constants'

type Props = {
  name: string
  price: number
  thumbnailSrc: string
  setIsModalVisible: (flag: boolean) => void
}

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
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
  justify-items: stretch;
  align-items: center;

  .order-modal-content-thumbnail {
    width: 100%;
  }

  .order-modal-content-data {
    margin: 0 15px;
    p {
      font-size: 16px;
    }
    .order-modal-content-name {
      font-weight: 600;
      margin-bottom: 5px;
    }
    .order-modal-content-price {
      font-weight: 300;
    }
  }
`
const StyledModalError = styled.p`
  grid-column: 1/13;
  color: red;
  font-size: 16px;
  text-align: center;
`

const StyledModalOrderButton = styled.button`
  grid-column: 1/13;
  border: 1px solid #bbb;
  border-radius: 5px;
  padding: 15px 0;
`

const StyledController = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30%;
  border-radius: 20px;
  background-color: #bbb;
  font-size: 16px;
  color: #fff;

  button {
    width: 100%;
    height: 100%;
  }
`

type State = {
  count: number
  error: string
  isErrorVisible: boolean
}

const initialState: State = {
  count: 1,
  error: '',
  isErrorVisible: false,
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
  const { name, price, thumbnailSrc } = props
  const { setIsModalVisible } = props

  const [state, dispatch] = useReducer(modalReducer, initialState)
  const modalOverlayRef = useRef<HTMLDivElement>(null)

  const clickOutsideModalHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.target === modalOverlayRef.current) setIsModalVisible(false)
  }

  return (
    <StyledContainer className="order-modal" onClick={clickOutsideModalHandler}>
      <div className="order-modal-overlay" ref={modalOverlayRef} />
      <StyledModalContent className="order-modal-content">
        <img className="order-modal-content-thumbnail" src={thumbnailSrc} />
        <div className="order-modal-content-data">
          <p className="order-modal-content-name">{name}</p>
          <p className="order-modal-content-price">{price}원</p>
        </div>
        <StyledController className="order-modal-controller">
          <button
            className="order-modal-controller-decrement-btn"
            onClick={() => dispatch({ type: 'decrement' })}
          >
            -
          </button>
          <p className="order-modal-controller-quantity">{state.count}</p>
          <button
            className="order-modal-controller-increment-btn"
            onClick={() => dispatch({ type: 'increment' })}
          >
            +
          </button>
        </StyledController>
        {state.isErrorVisible ? <StyledModalError>{state.error}</StyledModalError> : ''}
        <StyledModalOrderButton className="order-modal-content-order-btn">
          주문하기
        </StyledModalOrderButton>
      </StyledModalContent>
    </StyledContainer>
  )
}
