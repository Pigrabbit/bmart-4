import React from 'react'
import styled from 'styled-components'

type Props = {
  width?: string
  style?: React.CSSProperties
}

type StyledContainerProp = { width: string }

const StyledContainer = styled.div<StyledContainerProp>`
  width: ${(props) => props.width};
  flex: 0 0 auto;

  .thumbnail {
    padding: 50%;
    background-color: #eee;
    border-radius: 8px;
    animation: blink 1000ms ease infinite;
  }

  .description {
    width: 100%;
    height: 20px;
    background-color: #eee;
    border-radius: 4px;
    margin-top: 4px;
    animation: blink 1000ms ease infinite;
  }

  @keyframes blink {
    0% {
      opacity: 0.1;
    }
    51% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`

export const SkeletonCard = (props: Props) => {
  const { width = '50%', style } = props

  return (
    <StyledContainer className="product-card" width={width} style={style}>
      <div className="thumbnail"></div>
      <div className="description"></div>
      <div className="description"></div>
    </StyledContainer>
  )
}
