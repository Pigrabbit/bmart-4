import React, { useRef, MouseEvent, useReducer, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { MAX_PRODUCT_PURCHASE_LIMIT, MIN_PRODUCT_PURCHASE_LIMIT } from '../../utils/constants'
import { useMutation } from '@apollo/client'
import { parseToLocalMoneyString } from '../../utils/parser'
import { OrderButton } from '../OrderButton'
import { COLORS } from '../../utils/styleConstants'
import { CartDispatchContext } from '../../context/CartContext'
import { AddProductToCartVars, ADD_PRODUCT_TO_CART } from '../../apis/cart'

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

const StyledExitButton = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 2em;
  border-radius: 50%;
  color: #444;
  background-color: #eee;
  width: 28px;
  height: 28px;
  text-align: center;
  user-select: none;
  i {
    margin: auto auto;
  }
  &:focused {
    background-color: #ccc;
  }
`

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;

  .order-modal-overlay {
    background: rgba(0, 0, 0, 0.5);
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
  display: flex;
  width: 100%;
  min-height: 400px;
  background-color: white;
  border-radius: 20px 20px 0 0;
  animation: 0.3s ease-in slideUpModal;

  justify-items: stretch;
  align-items: center;

  .order-modal-content-thumbnail {
    max-width: 40%;
    border-radius: 6px;
  }

  .order-modal-content-data {
    margin: 0px 15px 0 15px;
    p {
      font-size: 1.2em;
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
  position: absolute;
  top: calc(50% + 10px);
  left: 50%;
  width: 300px;
  font-size: 1.5em;
  padding: 10px;
  transform: translate(-50%);
  align-self: start;
  color: ${COLORS.red};
  text-align: center;
`

const StyledWrapper = styled.div`
  margin: 0 0 0 20px;
`

const StyledController = styled.div`
  margin: 10px 5px 0px 5px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  border-radius: 25px;
  background-color: #fff;
  font-size: 30px;
  color: #000;

  button {
    font-size: 25px;
    width: 100%;
    height: 100%;
    i {
      &.disabled {
        color: #bbb;
      }
      padding: 5px;
      background-color: #eee;
      color: #444;
      border-radius: 50%;
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
    case 'error': {
      return {
        ...state,
        error: '장바구니에 최대 10개까지만 담을 수 있습니다.',
        isErrorVisible: true,
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

  const cartContextDispatch = useContext(CartDispatchContext)
  const [state, dispatch] = useReducer(modalReducer, initialState)
  const modalOverlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    props.setSavedCount(state.count)
  }, [state.count])

  const [addProductToCart] = useMutation<{ addProductToCart: string }, AddProductToCartVars>(
    ADD_PRODUCT_TO_CART
  )

  const exitButtonHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    props.setIsModalVisible(false)
  }
  const clickOutsideModalHandler = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.target === modalOverlayRef.current) props.setIsModalVisible(false)
  }

  const clickOrderButtonHandler = async () => {
    const { data } = await addProductToCart({
      variables: { productId: id, quantity: state.count },
    })

    if (data && parseInt(data.addProductToCart) >= 0) {
      props.setIsModalVisible(false)
      props.setIsOrderPlaced(true)
      cartContextDispatch({ type: 'addProduct', payload: { productIdList: [id] } })
      props.setSavedCount(1)
    } else {
      dispatch({ type: 'error' })
    }
  }

  return (
    <StyledContainer className="order-modal" onClick={clickOutsideModalHandler}>
      <div className="order-modal-overlay" ref={modalOverlayRef} />
      <StyledModalContent className="order-modal-content">
        <StyledExitButton onClick={exitButtonHandler}>
          <i className="icon">multiply</i>
        </StyledExitButton>
        <img
          className="order-modal-content-thumbnail"
          src={thumbnailSrc}
          alt={`order-modal-thumbnail-${id}`}
        />
        <StyledWrapper>
          <div className="order-modal-content-data">
            <p className="order-modal-content-name">{name}</p>
            <p className="order-modal-content-price">{parseToLocalMoneyString(price)}원</p>
          </div>
          <StyledController className="order-modal-controller">
            <button
              className={`order-modal-controller-decrement-btn`}
              onClick={() => dispatch({ type: 'decrement' })}
            >
              <i className={`icon ${state.count <= MIN_PRODUCT_PURCHASE_LIMIT ? 'disabled' : ''}`}>
                minus
              </i>
            </button>

            <p className="order-modal-controller-quantity">{state.count}</p>
            <button
              className={`order-modal-controller-increment-btn`}
              onClick={() => dispatch({ type: 'increment' })}
            >
              <i className={`icon ${state.count >= MAX_PRODUCT_PURCHASE_LIMIT ? 'disabled' : ''}`}>
                plus
              </i>
            </button>
          </StyledController>
        </StyledWrapper>
      </StyledModalContent>
      {state.isErrorVisible ? <StyledModalError>{state.error}</StyledModalError> : ''}
      <OrderButton clickHandler={clickOrderButtonHandler}>
        <>장바구니에 담기</>
      </OrderButton>
    </StyledContainer>
  )
}
