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
    background-color: #f5f5f5;
    border-radius: 8px;
    animation: blink 1000ms ease infinite;
    position: relative;

    .like {
      font-size: 24px;
      line-height: 24px;
      width: 24px;
      height: 24px;
      position: absolute;
      right: 4px;
      bottom: 4px;
      z-index: 10;
      color: #e5e5e5;
    }
  }

  .description {
    width: 100%;
    height: 20px;
    background-color: #f5f5f5;
    border-radius: 4px;
    margin-top: 4px;
    animation: blink 1000ms ease infinite;

    &:last-child {
      width: 40%;
    }
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
      <div className="thumbnail">
        <i className="icon like">heart_circle_fill</i>
      </div>
      <div className="description"></div>
      <div className="description"></div>
    </StyledContainer>
  )
}
