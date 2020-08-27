import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../utils/styleConstants'

type Props = { description?: string }

const StyledContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;
  background-color: white;
`

const StyledTungWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .tung {
    width: 210px;
  }

  .description {
    font-size: 20px;
    text-align: center;
    white-space: pre;
    color: ${COLORS.gray};
  }
`

export const CenteredImg = (props: Props) => {
  const { description } = props

  return (
    <StyledContainer>
      <StyledTungWrap>
        <img className="tung" src={`${process.env.PUBLIC_URL}/images/tung.png`}></img>
        {description && <div className="description">{description}</div>}
      </StyledTungWrap>
    </StyledContainer>
  )
}
