import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../../utils/styleConstants'

type Props = {
  isLiked: boolean
  lazyLoad?: boolean
  isSoldOut: boolean
  thumbnailSrc: string
  toggleProductLike: (e: React.MouseEvent) => void
  seperateClickEventHandler: (e: React.MouseEvent) => void
}

const StyledThumbnail = styled.div`
  position: relative;
  font-size: 0;
  .icon-wrap {
    font-size: 24px;
    line-height: 24px;
    width: 24px;
    height: 24px;
    position: absolute;
    right: 4px;
    bottom: 4px;
    z-index: 10;
    .icon {
      color: #eee;
      border-radius: 50%;
      &.like {
        color: ${COLORS.red};
      }
    }
  }
  .thumbnail-wrap {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    filter: brightness(0.96);
    overflow: hidden;
    position: relative;
    &.alt::before {
      content: '';
      display: block;
      padding: 50%;
      background-color: #fafafa;
    }
    &.sold-out::before {
      content: 'sold out';
      display: block;
      font-size: 24px;
      color: white;
      font-family: 'BMHANNAPro';
      position: absolute;
      background-color: rgba(0, 0, 0, 0.4);
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .thumbnail {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
`

export const ProductCardThumbnail = (props: Props) => {
  const { thumbnailSrc, lazyLoad, isLiked, isSoldOut } = props

  const renderThumbnail = () => {
    if (lazyLoad === undefined) {
      return (
        <div className={`thumbnail-wrap ${isSoldOut ? 'sold-out' : ''}`}>
          <img className="thumbnail" src={thumbnailSrc} alt="" />
        </div>
      )
    } else {
      if (!lazyLoad) {
        return (
          <div className="thumbnail-wrap alt">
            <img className="thumbnail" src={''} data-lazy={thumbnailSrc} alt="" />
          </div>
        )
      } else {
        return (
          <div className={`thumbnail-wrap ${isSoldOut ? 'sold-out' : ''}`}>
            <img className="thumbnail" src={thumbnailSrc} data-lazy={thumbnailSrc} alt="" />
          </div>
        )
      }
    }
  }

  return (
    <StyledThumbnail onDoubleClick={props.seperateClickEventHandler}>
      {(lazyLoad === undefined || lazyLoad) && (
        <div className="icon-wrap" onClick={props.toggleProductLike}>
          {isLiked ? (
            <i className="icon like">heart_circle</i>
          ) : (
            <i className="icon">heart_circle_fill</i>
          )}
        </div>
      )}
      {renderThumbnail()}
    </StyledThumbnail>
  )
}
