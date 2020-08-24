import React from 'react'
import styled from 'styled-components'
import { STYLES } from '../../utils/styleConstants'

type Props = {
  content: string
  getResult: (result: boolean) => void
}

const StyledWrap = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
`
const StyledContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  max-width: 400px;
  min-height: 120px;
  border-radius: ${STYLES.smallRadius};
  background-color: white;
  font-size: 14px;

  .content {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .confirm-btns {
    display: flex;
    border-top: 1px solid #ddd;
    position: relative;

    .confirm-btn {
      flex: 0 0 auto;
      width: 50%;
      height: 40px;
    }

    .cancel::after {
      content: '';
      display: block;
      width: 1px;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      background-color: #ddd;
    }

    .ok {
      font-weight: 600;
    }
  }
`

export const Confirm = (props: Props) => {
  const { content } = props

  return (
    <StyledWrap className="confirm-wrap">
      <StyledContainer className="confirm">
        <div className="content">{content}</div>
        <div className="confirm-btns">
          <button className="confirm-btn cancel" onClick={() => props.getResult(false)}>
            취소
          </button>
          <button className="confirm-btn ok" onClick={() => props.getResult(true)}>
            확인
          </button>
        </div>
      </StyledContainer>
    </StyledWrap>
  )
}
