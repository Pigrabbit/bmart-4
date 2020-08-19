import React, { useRef, MouseEvent } from 'react'
import styled from 'styled-components'

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

  .order-modal-content-order-btn {
    grid-column: 1/13;
    margin-top: 30px;
    border: 1px solid #bbb;
    border-radius: 5px;
    padding: 15px 0;
  }
`

const StyledModalOrderButton = styled.button`
  grid-column: 1/13;
  margin-top: 30px;
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

export const OrderModal = (props: Props) => {
  const { name, price, thumbnailSrc } = props
  const { setIsModalVisible } = props
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
          <button className="order-modal-controller-decrement-btn">-</button>
          <p className="order-modal-controller-quantity">1</p>
          <button className="order-modal-controller-increment-btn">+</button>
        </StyledController>
        <StyledModalOrderButton className="order-modal-content-order-btn">
          주문하기
        </StyledModalOrderButton>
      </StyledModalContent>
    </StyledContainer>
  )
}
